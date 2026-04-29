import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import ReviewPanel from './components/ReviewPanel';
import History from './components/History';

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [historyKey, setHistoryKey] = useState(0); // to force History re-render

  const handleReviewCode = async () => {
    if (!code || code.trim() === '') {
      setError('Please enter some code');
      return;
    }

    setLoading(true);
    setError(null);
    setReview(null);

    try {
      const response = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Review failed. Please try again.');
      }

      setReview(data.review);
      setHistoryKey(prev => prev + 1); // trigger history reload
      setActiveTab('Overview'); // Reset tab
    } catch (err) {
      console.error(err);
      setError('Review failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow Ctrl+Enter or Cmd+Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleReviewCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  const loadPastReview = (pastReview) => {
    // Only basic info, user would need full review API fetching
    // For now we just console log
    console.log('Load feature needs a GET /api/review/:id implementation', pastReview);
  };

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen font-sans flex flex-col md:flex-row p-4 gap-4">
      {/* Left side: Editor & Actions */}
      <div className="flex-[1.2] flex flex-col gap-4">
        <div className="flex-1 bg-[#1e293b] rounded-lg border border-[#334155] overflow-hidden flex flex-col min-h-[500px]">
          <div className="px-4 py-3 border-b border-[#334155] font-semibold text-lg flex justify-between items-center bg-[#0f172a]">
            <h1>AI Code Reviewer</h1>
            {review?.language && (
              <span className="bg-[#334155] px-2 py-1 text-sm rounded border border-[#475569]">
                Detected: {review.language}
              </span>
            )}
          </div>
          <Editor code={code} setCode={setCode} />
        </div>

        <button
          onClick={handleReviewCode}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex justify-center items-center gap-3 relative overflow-hidden group"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing your code...
            </>
          ) : (
            'Analyze Code (Ctrl + Enter)'
          )}
        </button>

        {error && <div className="text-[#ef4444] bg-[#1e293b] border border-[#ef4444] p-3 rounded-lg text-center font-medium shadow-sm">{error}</div>}
      </div>

      {/* Right side: Results */}
      <div className="flex-[1.5] flex flex-col gap-4 overflow-hidden h-[calc(100vh-2rem)]">
        {review ? (
          <ReviewPanel review={review} activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <div className="h-full bg-[#1e293b] border border-[#334155] rounded-lg flex flex-col items-center justify-center p-8 text-center text-[#94a3b8] shadow-inner">
            <div className="text-6xl mb-6 opacity-80">🔍</div>
            <h2 className="text-2xl font-bold text-[#e2e8f0] mb-3">Awaiting Code</h2>
            <p className="max-w-md">Paste your code on the left and click <span className="text-[#6366f1] font-semibold">Analyze Code</span> to get a comprehensive review covering bugs, security, performance, and best practices.</p>
          </div>
        )}
      </div>

      {/* History Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-4 flex-shrink-0 lg:w-72">
        <History key={historyKey} onLoadReview={loadPastReview} />
      </div>
    </div>
  );
}

export default App;
