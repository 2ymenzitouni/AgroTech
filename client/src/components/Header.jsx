import React from 'react'
import { Search, Bell, HelpCircle, Grid } from 'lucide-react'

export default function Header({ title, user, onSearch, activeNotifications, onOpenNotifications }) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline shadow-sm flex justify-between items-center h-16 px-gutter ml-auto">
      <div className="flex items-center gap-gutter">
        <h2 className="font-headline-lg text-lg font-bold text-primary dark:text-primary-fixed hidden md:block">
          {title}
        </h2>
        <div className="relative bg-surface-container-low px-4 py-1.5 rounded-full flex items-center gap-2 border border-outline-variant">
          <Search className="text-primary w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search system metrics..." 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-none p-0 text-body-md focus:ring-0 w-60 placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-stack-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenNotifications}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant relative"
          >
            <Bell className="w-5 h-5" />
            {activeNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse"></span>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant">
            <Grid className="w-5 h-5" />
          </button>
        </div>
        <div className="h-8 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="font-title-md text-sm leading-none font-bold group-hover:text-primary transition-colors">
              {user.name}
            </p>
            <p className="text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider">
              {user.role}
            </p>
          </div>
          <img 
            className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" 
            alt="User profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA5Uk0GKqmtwVe5Fg4WGM3h9jne6fptkWs0HFot0eqyd4QdenIWabWo-0K9NwRdLjOr0rrCCw2Yi8b2jQlRbfGcdX3A7wy2mH6Lja6OChFqpEHNgJ0z_l8zF7OfkABnxZE8VjPZF5RlV_b0uAqnnzBQ3PY6U5YjUpUWWAl-W9_Ily0kO55kd1C2KivEU_ljm7nqT2f1HBqbH1_bMJkwN0bmVIlu1KnyCvFg7G1VNWzdR7ZO5dhVKeV"
          />
        </div>
      </div>
    </header>
  )
}
