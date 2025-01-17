const FloatingObjects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left circle */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow"></div>
      
      {/* Top right circle */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-lg animate-float-medium"></div>
      
      {/* Bottom left shape */}
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-lg rotate-45 blur-xl animate-float-fast"></div>
      
      {/* Bottom right shape */}
      <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float-medium"></div>
      
      {/* Center left shape */}
      <div className="absolute top-1/3 -left-8 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg rotate-12 blur-lg animate-float-slow"></div>
      
      {/* Center right shape */}
      <div className="absolute top-1/2 -right-10 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-xl animate-float-fast"></div>
    </div>
  );
};

export default FloatingObjects;
