import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ICONS } from '../constants';
import { MeetingContext, SalesStrategy, StrategyVideo, VideoScene } from '../types';
import { generateSalesStrategy, generateVideoScript, generateVideoClip } from '../services/geminiService';
import { googleService } from '../services/googleService';

interface StrategyLabProps {
  activeDocuments: Array<{ name: string; content: string }>;
  meetingContext: MeetingContext;
}

export const StrategyLab: React.FC<StrategyLabProps> = ({ activeDocuments, meetingContext }) => {
  const [strategy, setStrategy] = useState<SalesStrategy | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'summary' | 'pillars' | 'wedge' | 'objections' | 'roadmap' | 'video'>('summary');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Video State
  const [videoContent, setVideoContent] = useState<StrategyVideo | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [activeVideoScene, setActiveVideoScene] = useState(0);

  const handleGenerateVideo = async () => {
    if (activeDocuments.length === 0) return;
    
    setIsGeneratingVideo(true);
    setVideoStatus('Synthesizing Neural Script...');
    try {
      const topic = strategy?.executiveSummary || "Overview of Sales Strategy";
      const result = await generateVideoScript(topic, meetingContext);
      
      const newVideo: StrategyVideo = {
        id: `vid-${Date.now()}`,
        title: result.title || "Strategic Insight",
        description: result.description || "",
        scenes: result.scenes || [],
        timestamp: Date.now(),
        status: 'generating'
      };
      
      setVideoContent(newVideo);
      
      // Generate first clip immediately for preview
      if (newVideo.scenes.length > 0) {
        setVideoStatus('Generating High-Fidelity Visuals (Veo 3.1 Lite)...');
        const videoUrl = await generateVideoClip(newVideo.scenes[0] as VideoScene);
        
        const updatedScenes = [...newVideo.scenes];
        updatedScenes[0] = { ...updatedScenes[0], videoUrl };
        
        setVideoContent({
          ...newVideo,
          scenes: updatedScenes,
          status: 'ready'
        });
      }
    } catch (err: any) {
      console.error(err);
      setError("Video generation protocol failed. Ensure API key has Veo permissions.");
    } finally {
      setIsGeneratingVideo(false);
      setVideoStatus('');
    }
  };

  const generateNextScene = async (index: number) => {
    if (!videoContent || index >= videoContent.scenes.length || videoContent.scenes[index].videoUrl) return;
    
    setIsGeneratingVideo(true);
    setVideoStatus(`Synthesizing Scene ${index + 1}...`);
    try {
      const videoUrl = await generateVideoClip(videoContent.scenes[index] as VideoScene);
      const updatedScenes = [...videoContent.scenes];
      updatedScenes[index] = { ...updatedScenes[index], videoUrl };
      setVideoContent({ ...videoContent, scenes: updatedScenes });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingVideo(false);
      setVideoStatus('');
    }
  };

  const handleSendEmail = async () => {
    if (!strategy) return;
    
    setIsSendingEmail(true);
    try {
      const isConnected = await googleService.getAuthStatus();
      if (!isConnected) {
        alert('Please connect your Google account in Settings first.');
        return;
      }

      const subject = `Strategic Sales Report: ${meetingContext.clientCompany} - SPIKED AI`;
      const body = `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Strategic Sales Intelligence</h1>
          <p style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Deal Context: ${meetingContext.sellerCompany} vs ${meetingContext.clientCompany}</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h2 style="font-size: 18px; margin-top: 0;">Executive Summary</h2>
            <p style="font-style: italic; color: #334155;">"${strategy.executiveSummary}"</p>
          </div>

          <h2 style="font-size: 18px;">Competitive Wedge</h2>
          <p style="background: #fff7ed; padding: 15px; border-left: 4px solid #f59e0b; color: #9a3412;">${strategy.competitiveWedge}</p>

          <h2 style="font-size: 18px;">Strategic Pillars</h2>
          ${strategy.strategicPillars.map(p => `
            <div style="margin-bottom: 15px;">
              <strong style="color: #059669;">${p.title}</strong>
              <p style="font-size: 14px; margin: 5px 0;">${p.description}</p>
            </div>
          `).join('')}

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">Generated by SPIKED AI Neural Intelligence Protocol</p>
        </div>
      `;

      await googleService.sendReport(meetingContext.clientNames || 'Sales Team', subject, body);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to send email report.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleGenerate = async (refine: boolean = false) => {
    if (activeDocuments.length === 0) {
      setError("No document intelligence detected. Please upload documents in Settings.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const combinedContent = activeDocuments.map(d => `DOC: ${d.name}\n${d.content}`).join('\n\n');
      const result = await generateSalesStrategy(combinedContent, meetingContext, refine ? refinementPrompt : undefined);
      setStrategy(result);
      if (refine) setRefinementPrompt('');
    } catch (err: any) {
      setError(err.message || "Failed to generate strategic core.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!strategy && activeDocuments.length > 0) {
      handleGenerate();
    }
  }, [activeDocuments.length]);

  if (activeDocuments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-8">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
          <ICONS.Research className="w-10 h-10 text-slate-500" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-white tracking-tight">Intelligence Deficit Detected</h3>
          <p className="text-slate-400 max-w-md mx-auto font-medium">
            The Strategy Lab requires documentary intelligence to synthesize a winning approach. Please upload deal documents in the Settings node.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/20">
                  <ICONS.Brain className="w-5 h-5" />
                </div>
                <h2 className="text-4xl font-display font-black text-white tracking-tighter uppercase">Strategy Lab</h2>
              </div>
              <p className="text-slate-400 font-medium text-lg">Enterprise Sales Strategy Synthesis & Refinement</p>
            </div>
            
            <button 
              id="tour-synthesize-btn"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/20 active:scale-95 flex items-center gap-3"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ICONS.Sparkles className="w-4 h-4" />
              )}
              Re-Synthesize Core
            </button>

            {strategy && (
              <button 
                id="tour-send-report"
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className={`px-8 py-4 ${emailSent ? 'bg-emerald-600' : 'bg-slate-800'} hover:bg-slate-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-3 border border-slate-700`}
              >
                {isSendingEmail ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : emailSent ? (
                  <ICONS.Check className="w-4 h-4" />
                ) : (
                  <ICONS.Calendar className="w-4 h-4" />
                )}
                {emailSent ? 'Report Sent' : 'Send to Gmail'}
              </button>
            )}
          </div>

          {error && (
            <div className="p-6 bg-rose-900/20 border border-rose-900/50 rounded-3xl flex items-center gap-4 text-rose-400 animate-in fade-in slide-in-from-top-4">
              <ICONS.Security className="w-5 h-5" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          {!strategy && isGenerating ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-8">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-slate-800 border-t-indigo-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ICONS.Brain className="w-8 h-8 text-indigo-500 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] animate-pulse">Synthesizing Strategic Pillars...</p>
            </div>
          ) : strategy ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Navigation Rail */}
              <div className="lg:col-span-3 space-y-4">
                <NavButton active={activeSection === 'summary'} onClick={() => setActiveSection('summary')} icon={<ICONS.Document />} label="Executive Summary" />
                <NavButton active={activeSection === 'pillars'} onClick={() => setActiveSection('pillars')} icon={<ICONS.Map />} label="Strategic Pillars" />
                <NavButton active={activeSection === 'wedge'} onClick={() => setActiveSection('wedge')} icon={<ICONS.Efficiency />} label="Competitive Wedge" />
                <NavButton active={activeSection === 'objections'} onClick={() => setActiveSection('objections')} icon={<ICONS.Security />} label="Objection Defense" />
                <NavButton active={activeSection === 'roadmap'} onClick={() => setActiveSection('roadmap')} icon={<ICONS.Research />} label="Strategic Roadmap" />
                <NavButton active={activeSection === 'video'} onClick={() => setActiveSection('video')} icon={<ICONS.Sparkles />} label="Strategic Video" />
                
                <div className="pt-8 mt-8 border-t border-slate-800 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-4">Refine Strategy</h4>
                  <div className="px-4 space-y-4">
                    <textarea 
                      value={refinementPrompt}
                      onChange={(e) => setRefinementPrompt(e.target.value)}
                      placeholder="e.g., Focus more on ROI for the CFO..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 outline-none transition-all h-32 resize-none"
                    />
                    <button 
                      onClick={() => handleGenerate(true)}
                      disabled={isGenerating || !refinementPrompt.trim()}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-indigo-400 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border border-slate-700 active:scale-95"
                    >
                      Apply Refinement
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 md:p-16 min-h-[600px]"
                  >
                    {activeSection === 'summary' && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                            <ICONS.Document className="w-6 h-6" />
                          </div>
                          <h3 className="text-3xl font-display font-black text-white tracking-tight">Executive Summary</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-200 leading-relaxed italic">
                          “{strategy.executiveSummary}”
                        </p>
                      </div>
                    )}

                    {activeSection === 'pillars' && (
                      <div className="space-y-12">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-emerald-900/30 text-emerald-400 rounded-2xl flex items-center justify-center">
                            <ICONS.Map className="w-6 h-6" />
                          </div>
                          <h3 className="text-3xl font-black text-white tracking-tight">Strategic Pillars</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {strategy.strategicPillars.map((pillar, i) => (
                            <div key={`${pillar.title}-${i}`} className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] space-y-6 group hover:border-emerald-900/50 transition-all">
                              <div className="flex items-center gap-3">
                                <span className="text-emerald-500 font-black text-xl">0{i+1}</span>
                                <h4 className="text-xl font-black text-white">{pillar.title}</h4>
                              </div>
                              <p className="text-slate-400 text-sm font-medium leading-relaxed">{pillar.description}</p>
                              <div className="space-y-3 pt-4 border-t border-slate-800">
                                {pillar.tacticalActions.map((action, j) => (
                                  <div key={`${action}-${j}`} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <p className="text-xs font-bold text-slate-300">{action}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'wedge' && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-amber-900/30 text-amber-400 rounded-2xl flex items-center justify-center">
                            <ICONS.Efficiency className="w-6 h-6" />
                          </div>
                          <h3 className="text-3xl font-black text-white tracking-tight">Competitive Wedge</h3>
                        </div>
                        <div className="p-12 bg-amber-900/10 border border-amber-900/30 rounded-[3rem] relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ICONS.Efficiency className="w-32 h-32 text-amber-500" />
                          </div>
                          <p className="text-3xl font-black text-amber-100 leading-tight relative z-10">
                            {strategy.competitiveWedge}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSection === 'objections' && (
                      <div className="space-y-12">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-rose-900/30 text-rose-400 rounded-2xl flex items-center justify-center">
                            <ICONS.Security className="w-6 h-6" />
                          </div>
                          <h3 className="text-3xl font-black text-white tracking-tight">Objection Defense</h3>
                        </div>
                        <div className="space-y-6">
                          {strategy.objectionDefense.map((item, i) => (
                            <div key={`${item.objection}-${i}`} className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start">
                              <div className="flex-1 space-y-3">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-400">The Friction Node</h5>
                                <p className="text-xl font-bold text-white">“{item.objection}”</p>
                              </div>
                              <div className="w-px h-full bg-slate-800 hidden md:block" />
                              <div className="flex-1 space-y-3">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">The Strategic Counter</h5>
                                <p className="text-sm font-medium text-slate-300 leading-relaxed italic">{item.counterStrategy}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'roadmap' && (
                      <div className="space-y-12">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-indigo-900/30 text-indigo-400 rounded-2xl flex items-center justify-center">
                            <ICONS.Research className="w-6 h-6" />
                          </div>
                          <h3 className="text-3xl font-black text-white tracking-tight">Strategic Roadmap</h3>
                        </div>
                        <div className="relative space-y-12">
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800" />
                          {strategy.roadmap.map((step, i) => (
                            <div key={`${step.phase}-${i}`} className="relative pl-20 group">
                              <div className="absolute left-0 top-0 w-12 h-12 bg-slate-950 border-2 border-indigo-600 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                <span className="text-white font-black text-sm">{i+1}</span>
                              </div>
                              <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] space-y-4">
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">{step.phase}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {step.milestones.map((m, j) => (
                                    <div key={`${m}-${j}`} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-xl border border-slate-800/50">
                                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                      <span className="text-xs font-bold text-slate-400">{m}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'video' && (
                      <div className="space-y-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center">
                              <ICONS.Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-3xl font-black text-white tracking-tight">Strategic Video Generator</h3>
                               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Powered by Veo 3.1 Lite & Gemini 3.1 Pro</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleGenerateVideo}
                            disabled={isGeneratingVideo}
                            className="px-6 py-3 bg-brand-accent hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
                          >
                            {isGeneratingVideo ? (
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <ICONS.Sparkles className="w-3 h-3" />
                            )}
                            {videoContent ? 'Regenerate Video' : 'Generate Strategy Video'}
                          </button>
                        </div>

                        {isGeneratingVideo && !videoContent && (
                          <div className="flex flex-col items-center justify-center py-20 space-y-6">
                            <div className="relative">
                               <div className="w-16 h-16 border-4 border-slate-800 border-t-brand-accent rounded-full animate-spin" />
                            </div>
                            <div className="text-center space-y-2">
                               <p className="text-white font-black uppercase tracking-widest animate-pulse">{videoStatus}</p>
                               <p className="text-slate-500 text-[10px] max-w-xs mx-auto">This may take up to 60 seconds as we synthesize neural visuals and strategic narratives.</p>
                            </div>
                          </div>
                        )}

                        {videoContent && (
                          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                            {/* Video Player */}
                            <div className="xl:col-span-8 space-y-6">
                              <div className="aspect-video bg-black rounded-[2rem] border border-slate-800 overflow-hidden relative shadow-2xl">
                                {videoContent.scenes[activeVideoScene]?.videoUrl ? (
                                  <video 
                                    src={videoContent.scenes[activeVideoScene].videoUrl} 
                                    controls 
                                    autoPlay
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-slate-900/50">
                                    <div className="w-12 h-12 border-4 border-slate-800 border-t-brand-accent rounded-full animate-spin" />
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{videoStatus || 'Waiting for Scene Generation...'}</p>
                                  </div>
                                )}
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                   <h4 className="text-white font-black text-xl uppercase tracking-tight">{videoContent.scenes[activeVideoScene]?.title}</h4>
                                   <p className="text-slate-300 text-sm italic mt-2">"{videoContent.scenes[activeVideoScene]?.script}"</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                {videoContent.scenes.map((scene, i) => (
                                  <button
                                    key={scene.id}
                                    onClick={() => {
                                      setActiveVideoScene(i);
                                      if (!scene.videoUrl) generateNextScene(i);
                                    }}
                                    className={`flex-1 p-4 rounded-2xl border transition-all text-left space-y-2 relative overflow-hidden ${activeVideoScene === i ? 'bg-slate-800 border-brand-accent shadow-lg shadow-brand-accent/10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className={`text-[10px] font-black uppercase tracking-widest ${activeVideoScene === i ? 'text-brand-accent' : 'text-slate-500'}`}>Scene 0{i + 1}</span>
                                      {scene.videoUrl ? <ICONS.Check className="w-3 h-3 text-emerald-500" /> : isGeneratingVideo && activeVideoScene === i ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : null}
                                    </div>
                                    <p className={`text-xs font-bold leading-tight ${activeVideoScene === i ? 'text-white' : 'text-slate-400'}`}>{scene.title}</p>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Scene Details */}
                            <div className="xl:col-span-4 space-y-6">
                               <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 space-y-6">
                                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-4">Neural Directives</h4>
                                  
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <h5 className="text-[10px] font-black text-brand-accent uppercase">Narrative Script</h5>
                                      <p className="text-sm font-medium text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 italic">
                                        {videoContent.scenes[activeVideoScene]?.script}
                                      </p>
                                    </div>

                                    <div className="space-y-2">
                                      <h5 className="text-[10px] font-black text-indigo-400 uppercase">Visual Prompt (Veo)</h5>
                                      <p className="text-[11px] font-bold text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800">
                                        {videoContent.scenes[activeVideoScene]?.visualDescription}
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                       <div className="space-y-1">
                                          <span className="text-[9px] font-black text-slate-600 uppercase">Resolution</span>
                                          <p className="text-xs font-bold text-white uppercase">1080p (Lite)</p>
                                       </div>
                                       <div className="space-y-1">
                                          <span className="text-[9px] font-black text-slate-600 uppercase">Duration</span>
                                          <p className="text-xs font-bold text-white uppercase">{videoContent.scenes[activeVideoScene]?.duration}s</p>
                                       </div>
                                    </div>
                                  </div>
                               </div>

                               <div className="p-6 bg-indigo-900/10 border border-indigo-900/30 rounded-2xl flex items-start gap-3">
                                  <ICONS.Brain className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                  <p className="text-[10px] font-bold text-indigo-300 leading-relaxed">
                                    Our Cognitive Engine uses multiple reference points from your deal documents to generate strategically accurate visual metaphors.
                                  </p>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border ${active ? 'bg-brand-primary border-brand-primary text-white shadow-xl translate-x-2' : 'bg-neural-900 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
  >
    <div className={`${active ? 'text-white' : 'text-slate-500'}`}>{icon}</div>
    <span className="text-[11px] font-display font-black uppercase tracking-widest">{label}</span>
  </button>
);
