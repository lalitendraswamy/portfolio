import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDatabase, FaExchangeAlt, FaMicrochip, FaUserCheck } from 'react-icons/fa';
import { VirtualAssistant } from './VirtualAssistant/VirtualAssistant';

const VirtualAssistantPage = () => {
  const navigate = useNavigate();

  // Scroll to the very top of the page when redirecting to this route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 flex flex-col min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 px-4 py-2 border border-secondary/30 rounded-xl text-secondary hover:text-white hover:border-white w-fit transition-all duration-300 mb-8 cursor-pointer shadow-md bg-transparent"
      >
        <FaArrowLeft size={14} />
        <span>Back to Projects</span>
      </button>

      {/* Grid Layout - Swapped to give Sandbox the main focus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch flex-grow">

        {/* Left Side: Chat Sandbox Panel (Main Space) - Grabs the eye immediately */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="w-full h-full bg-black-200/50 rounded-3xl border border-secondary/10 overflow-hidden shadow-2xl">
            <VirtualAssistant isEmbed={true} />
          </div>
        </div>

        {/* Right Side: System Architecture & Docs (Secondary Space) - Compact and sleek */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-black-100 p-6 rounded-3xl border border-secondary/10 shadow-card">
          <div>
            <span className="text-secondary text-[12px] uppercase tracking-widest font-semibold">System Specs</span>
            <h2 className="text-white font-bold text-[22px] mt-1">RAG Architecture</h2>

            <p className="mt-3 text-secondary text-[14px] leading-[24px]">
              This Retrieval-Augmented Generation (RAG) system queries local vector databases to resolve queries in real-time.
            </p>

            {/* Architecture Steps (Compact/Sleek) */}
            <div className="mt-6 space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-secondary/10 rounded-lg text-[#00cea8] border border-[#00cea8]/10 mt-0.5">
                  <FaExchangeAlt size={12} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[14px]">1. API Routing</h4>
                  <p className="text-secondary text-[12px] mt-0.5 leading-normal">FastAPI receives questions and validates chat history context.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-secondary/10 rounded-lg text-[#804dee] border border-[#804dee]/10 mt-0.5">
                  <FaDatabase size={12} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[14px]">2. Vector Retrieval</h4>
                  <p className="text-secondary text-[12px] mt-0.5 leading-normal">Embeds queries to query vector store candidate details.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-secondary/10 rounded-lg text-[#bf61ff] border border-[#bf61ff]/10 mt-0.5">
                  <FaMicrochip size={12} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[14px]">3. LLM Grounding</h4>
                  <p className="text-secondary text-[12px] mt-0.5 leading-normal">Synthesizes grounded context fact-backed responses via LLM.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-secondary/10 rounded-lg text-[#ff4d4d] border border-[#ff4d4d]/10 mt-0.5">
                  <FaUserCheck size={12} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[14px]">4. Personas</h4>
                  <p className="text-secondary text-[12px] mt-0.5 leading-normal">Adjusts response tone dynamically (HR, Interviewer, Student, Freelancer).</p>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default VirtualAssistantPage;
