import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  // Mock data representing your innovative service request stream
  const [tickets, setTickets] = useState([
    { id: 'REQ-104', title: 'Provision AWS Staging Environment', category: 'DevOps', priority: 'High', status: 'In Progress', date: 'Just now' },
    { id: 'REQ-103', title: 'GPU Cluster Access for ML Model', category: 'Hardware', priority: 'Urgent', status: 'Pending', date: '2 hours ago' },
    { id: 'REQ-102', title: 'Figma Enterprise License Seat', category: 'Software', priority: 'Low', status: 'Approved', date: 'Yesterday' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('DevOps');
  const [newPriority, setNewPriority] = useState('Medium');

  const handleSignOut = async (e) => {
    if (e) e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTicket = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      status: 'Pending',
      date: 'Just now'
    };

    setTickets([newTicket, ...tickets]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 1. SIDEBAR COMPONENT */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col justify-between p-6 shrink-0 border-r border-slate-800 hidden md:flex">
        <div className="space-y-8">
          {/* Brand Identity Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20">
              Ω
            </div>
            <span className="text-white font-bold tracking-tight text-lg">NexusFlow</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-slate-800 text-white font-medium rounded-xl text-sm transition-all">
              <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
              Request Control
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/60 hover:text-slate-200 rounded-xl text-sm transition-all">
              <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
              Global Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/60 hover:text-slate-200 rounded-xl text-sm transition-all">
              <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings Panel
            </a>
          </nav>
        </div>

        {/* User Identity Footer Context */}
        <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 truncate">{session?.user?.email}</span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wide uppercase mt-0.5">Active Operator</span>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full text-left py-2 px-3 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl text-xs font-semibold transition-all"
          >
            Terminate Session
          </button>
        </div>
      </aside>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Floating Dashboard Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Request Deployment Core</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/10 active:scale-[0.98] transition-all"
          >
            <span>+</span> Dispatch New Request
          </button>
        </header>

        {/* Dashboard Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
          
          {/* Welcome Message Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold tracking-tight">System Initialization Complete</h2>
              <p className="text-sm text-slate-300 mt-1">Welcome back, operator <span className="font-semibold text-white">{session?.user?.email}</span>.</p>
            </div>
          </div>

          {/* 3. ANALYTICAL TOPLINE WIDGET METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dispatched Queue</span>
              <p className="text-3xl font-bold text-slate-900 mt-2">{tickets.length}</p>
              <span className="text-xs text-slate-500 mt-1 block">Active pipelines running</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Awaiting Dispatch</span>
              <p className="text-3xl font-bold text-amber-600 mt-2">
                {tickets.filter(t => t.status === 'Pending').length}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">Requires engineer validation</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fulfilled Today</span>
              <p className="text-3xl font-bold text-emerald-600 mt-2">14</p>
              <span className="text-xs text-emerald-600/90 font-medium mt-1 block">⚡ 98.4% success rate</span>
            </div>
          </div>

          {/* 4. MAIN DATA TABLE WORKFEED */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800">Operational Log Feed</h3>
              <span className="text-xs font-medium text-slate-500">Real-time update panel</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/30">
                    <th className="py-3.5 px-6">Request ID</th>
                    <th className="py-3.5 px-6">Description Scope</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Priority</th>
                    <th className="py-3.5 px-6">System Status</th>
                    <th className="py-3.5 px-6 text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                        {ticket.id}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {ticket.title}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {ticket.category}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-semibold ${ticket.priority === 'Urgent' ? 'text-rose-600' : ticket.priority === 'High' ? 'text-amber-600' : 'text-slate-500'}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${ticket.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : ticket.status === 'In Progress' ? 'bg-sky-50 text-sky-700 border border-sky-200/50' : 'bg-amber-50 text-amber-700 border border-amber-200/50'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'Approved' ? 'bg-emerald-500' : ticket.status === 'In Progress' ? 'bg-sky-500' : 'bg-amber-500'}`} />
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-slate-500 text-xs">
                        {ticket.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* 5. OVERLAY DISPATCH CREATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Initialize Operational Resource</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateTicket} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Resource Request Goal</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Deploy ElasticSearch replica node..."
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Domain Class</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                >
                  <option>DevOps</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Finance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Impact Weight</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;