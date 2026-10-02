/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsGrid } from './components/StatsGrid';
import { RaceTrack } from './components/RaceTrack';
import { CodeEditorArea } from './components/CodeEditorArea';
import { MatchResultsModal } from './components/MatchResultsModal';
import { LeaderboardSection } from './components/LeaderboardSection';
import { PracticeChallenges } from './components/PracticeChallenges';
import { AnalyticsSection } from './components/AnalyticsSection';
import { Footer } from './components/Footer';
import { ResponsiveTesterBar } from './components/ResponsiveTesterBar';
import { CODE_SNIPPETS } from './data/snippets';
import { CodeSnippet, Language, Difficulty, MatchStats } from './types';
import { soundManager } from './utils/audio';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'arena' | 'practice' | 'leaderboard' | 'analytics'>('arena');

  // Active code snippet
  const [snippet, setSnippet] = useState<CodeSnippet>(CODE_SNIPPETS[0]);
  const [userInput, setUserInput] = useState<string>('');

  // Typing session state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [bestWpm, setBestWpm] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('codebattle_best_wpm')) || 104;
    } catch {
      return 104;
    }
  });

  // Post match modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Bot opponent state
  const [botProgress, setBotProgress] = useState<number>(0);
  const botTargetWpm = useRef<number>(94);
  const botIntervalRef = useRef<number | null>(null);

  // Responsive device tester state
  const [testWidth, setTestWidth] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Track window resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute live match statistics
  const computeStats = useCallback((): MatchStats => {
    const totalChars = userInput.length;
    let correctChars = 0;
    const targetCode = snippet.code;

    for (let i = 0; i < totalChars; i++) {
      if (userInput[i] === targetCode[i]) {
        correctChars++;
      }
    }

    const elapsedSeconds = startTime
      ? ((endTime || Date.now()) - startTime) / 1000
      : 0;

    const elapsedMinutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : 0.001;

    // Standard WPM: (correct characters / 5) / elapsed minutes
    const rawWpm = Math.round(totalChars / 5 / elapsedMinutes) || 0;
    const netWpm = Math.round(correctChars / 5 / elapsedMinutes) || 0;

    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;
    const isCompleted = targetCode.length > 0 && userInput.length >= targetCode.length;

    return {
      wpm: netWpm,
      rawWpm,
      accuracy,
      timeElapsed: elapsedSeconds,
      totalChars,
      correctChars,
      incorrectChars: incorrectCount,
      streak,
      maxStreak,
      isCompleted,
      history: [],
    };
  }, [userInput, startTime, endTime, snippet.code, incorrectCount, streak, maxStreak]);

  const stats = computeStats();

  // Handle typing input changes with real-time audio and stats
  const handleInputChange = (newVal: string) => {
    if (stats.isCompleted) return;

    const prevLen = userInput.length;
    const newLen = newVal.length;

    // Start timer on first keystroke
    if (!startTime && newLen > 0) {
      const now = Date.now();
      setStartTime(now);

      // Start bot opponent racer
      botTargetWpm.current = 88 + Math.floor(Math.random() * 18); // 88 - 105 WPM
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);

      botIntervalRef.current = window.setInterval(() => {
        setBotProgress((prev) => {
          if (prev >= 100) {
            if (botIntervalRef.current) clearInterval(botIntervalRef.current);
            return 100;
          }
          // Increment based on bot target WPM
          // ~ 5 chars per word -> botTargetWpm * 5 / 60 chars per second
          const charsPerSec = (botTargetWpm.current * 5) / 60;
          const pctPerStep = (charsPerSec / snippet.code.length) * 100 * 0.2; // 200ms step
          return Math.min(100, prev + pctPerStep);
        });
      }, 200);
    }

    // Check if character was added
    if (newLen > prevLen) {
      const addedChar = newVal[newLen - 1];
      const expectedChar = snippet.code[newLen - 1];
      const isCorrect = addedChar === expectedChar;

      // Play audio feedback
      soundManager.playKeyClick(!isCorrect);

      if (isCorrect) {
        setStreak((prev) => {
          const next = prev + 1;
          setMaxStreak((m) => Math.max(m, next));
          return next;
        });
      } else {
        setStreak(0);
        setIncorrectCount((prev) => prev + 1);
      }
    }

    setUserInput(newVal);

    // Check for completion
    if (newLen >= snippet.code.length) {
      const finishTime = Date.now();
      setEndTime(finishTime);
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);

      soundManager.playSuccessChime();

      // Compute final WPM
      const finalSec = startTime ? (finishTime - startTime) / 1000 : 1;
      const finalMin = finalSec / 60;
      const finalWpm = Math.round(newVal.length / 5 / finalMin);

      if (finalWpm > bestWpm) {
        setBestWpm(finalWpm);
        try {
          localStorage.setItem('codebattle_best_wpm', String(finalWpm));
        } catch {
          // ignore
        }
      }

      setTimeout(() => {
        setIsModalOpen(true);
      }, 400);
    }
  };

  // Restart current snippet
  const handleRestart = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIncorrectCount(0);
    setStreak(0);
    setBotProgress(0);
    if (botIntervalRef.current) clearInterval(botIntervalRef.current);
  };

  // Next snippet
  const handleNextSnippet = () => {
    const currentIndex = CODE_SNIPPETS.findIndex((s) => s.id === snippet.id);
    const nextIndex = (currentIndex + 1) % CODE_SNIPPETS.length;
    setSnippet(CODE_SNIPPETS[nextIndex]);
    handleRestart();
  };

  // Select specific snippet
  const handleSelectSnippet = (newSnippet: CodeSnippet) => {
    setSnippet(newSnippet);
    handleRestart();
    setActiveTab('arena');
    // Scroll to arena
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select language
  const handleSelectLanguage = (lang: Language) => {
    const matching = CODE_SNIPPETS.find((s) => s.language === lang);
    if (matching) {
      setSnippet(matching);
      handleRestart();
    }
  };

  // Select difficulty
  const handleSelectDifficulty = (diff: Difficulty) => {
    const matching = CODE_SNIPPETS.find(
      (s) => s.difficulty === diff && s.language === snippet.language
    ) || CODE_SNIPPETS.find((s) => s.difficulty === diff);

    if (matching) {
      setSnippet(matching);
      handleRestart();
    }
  };

  // Cleanup bot timer on unmount
  useEffect(() => {
    return () => {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    };
  }, []);

  const playerProgress =
    snippet.code.length > 0
      ? Math.min(100, (userInput.length / snippet.code.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Responsive Breakpoint Tester Toolbar */}
      <ResponsiveTesterBar
        currentTestWidth={testWidth}
        onSelectWidth={setTestWidth}
        actualWindowWidth={windowWidth}
      />

      {/* 
        Container wrapping: 
        If testWidth is set, wraps into a simulated viewport with border and shadow for testing 320px, 375px, etc.
        If testWidth is null, expands to standard responsive full-width behavior.
      */}
      <div
        className={`w-full mx-auto transition-all duration-300 ${
          testWidth
            ? 'border-x-2 border-dashed border-emerald-500/50 bg-slate-950 shadow-2xl relative my-2 overflow-x-hidden'
            : ''
        }`}
        style={testWidth ? { maxWidth: `${testWidth}px` } : undefined}
      >
        {/* Device test indicator tag when test mode is active */}
        {testWidth && (
          <div className="bg-emerald-950 text-emerald-300 border-b border-emerald-800 text-[11px] font-mono py-1 px-3 flex items-center justify-between">
            <span>Simulated Viewport: {testWidth}px</span>
            <button
              onClick={() => setTestWidth(null)}
              className="text-emerald-400 hover:text-white underline font-semibold text-[10px]"
            >
              Exit Sim
            </button>
          </div>
        )}

        {/* Global Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onQuickMatch={() => {
            handleRestart();
            setActiveTab('arena');
          }}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 w-full pb-12">
          {/* Hero Section */}
          <Hero
            onStartDuel={() => {
              setActiveTab('arena');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            onExploreSnippets={() => {
              setActiveTab('practice');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            topSpeed={bestWpm}
          />

          {/* Tab 1: Arena (Live Speed Coding Duel) */}
          {activeTab === 'arena' && (
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-5 sm:space-y-6">
              {/* Horizontal Stats Bar on Desktop, 2x2/1-col on Mobile */}
              <StatsGrid stats={stats} bestWpm={bestWpm} />

              {/* Real-time Visual Race Track */}
              <RaceTrack
                playerProgress={playerProgress}
                playerWpm={stats.wpm}
                botProgress={botProgress}
                botWpm={botTargetWpm.current}
                botName="CodePhantom"
              />

              {/* Code Editor and Telemetry */}
              <CodeEditorArea
                snippet={snippet}
                userInput={userInput}
                onInputChange={handleInputChange}
                stats={stats}
                onRestart={handleRestart}
                onNextSnippet={handleNextSnippet}
                onSelectLanguage={handleSelectLanguage}
                onSelectDifficulty={handleSelectDifficulty}
              />
            </div>
          )}

          {/* Tab 2: Practice Tracks */}
          {activeTab === 'practice' && (
            <PracticeChallenges
              currentSnippetId={snippet.id}
              onSelectSnippet={handleSelectSnippet}
            />
          )}

          {/* Tab 3: Global Leaderboard */}
          {activeTab === 'leaderboard' && (
            <LeaderboardSection userBestWpm={bestWpm} />
          )}

          {/* Tab 4: Analytics & Breakpoint Audit */}
          {activeTab === 'analytics' && (
            <AnalyticsSection stats={stats} bestWpm={bestWpm} />
          )}

          {/* Persistent Supporting Sections for high visual depth */}
          {activeTab === 'arena' && (
            <>
              <PracticeChallenges
                currentSnippetId={snippet.id}
                onSelectSnippet={handleSelectSnippet}
              />
              <LeaderboardSection userBestWpm={bestWpm} />
            </>
          )}
        </main>

        {/* Post-Match Breakdown Modal */}
        <MatchResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stats={stats}
          snippet={snippet}
          onRestart={handleRestart}
          onNextSnippet={handleNextSnippet}
          botWpm={botTargetWpm.current}
        />

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}
