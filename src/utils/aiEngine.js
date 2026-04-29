// AI Engine Logic & Datasets

export const branches = [
  'Computer Science', 'Mechanical', 'Electrical', 'Civil',
  'Biotechnology', 'Electronics', 'Chemical', 'Aerospace', 'Physics', 'Data Science', 'Design'
];

export const budgets = [
  '₹20k–30k', '₹30k–40k', '₹40k–50k', '₹50k–60k', '₹60k–70k',
  '₹70k–80k', '₹80k–90k', '₹90k–1.1L', '₹1.1L–1.3L'
];

export const workloads = [
  'Coding', 'Machine Learning', 'CAD', 'Simulation', 'Rendering', 'Balanced'
];

const parseBudget = (budgetStr) => {
  if (budgetStr === '₹20k–30k') return 30000;
  if (budgetStr === '₹30k–40k') return 40000;
  if (budgetStr === '₹40k–50k') return 50000;
  if (budgetStr === '₹50k–60k') return 60000;
  if (budgetStr === '₹60k–70k') return 70000;
  if (budgetStr === '₹70k–80k') return 80000;
  if (budgetStr === '₹80k–90k') return 90000;
  if (budgetStr === '₹90k–1.1L') return 110000;
  if (budgetStr === '₹1.1L–1.3L') return 130000;
  return 60000; // default
};

// --- DATASETS ---

const cpus = [
  { name: 'Intel Core i3-12100F', price: 8500, score: 55, type: 'budget' },
  { name: 'AMD Ryzen 3 4100', price: 6500, score: 50, type: 'budget' },
  { name: 'Intel Core i5-12400F', price: 13000, score: 70, type: 'mid' },
  { name: 'AMD Ryzen 5 5600X', price: 14500, score: 75, type: 'mid' },
  { name: 'Intel Core i5-13400F', price: 18500, score: 82, type: 'mid-high' },
  { name: 'AMD Ryzen 5 7600X', price: 21000, score: 85, type: 'mid-high' },
  { name: 'Intel Core i7-13700K', price: 38000, score: 92, type: 'high' },
  { name: 'AMD Ryzen 7 7800X3D', price: 36000, score: 95, type: 'high' },
  { name: 'Intel Core i9-13900K', price: 54000, score: 98, type: 'ultra' },
  { name: 'AMD Ryzen 9 7950X', price: 52000, score: 99, type: 'ultra' },
];

const gpus = [
  { name: 'Integrated Graphics', price: 0, score: 30, type: 'integrated' },
  { name: 'NVIDIA GTX 1650 4GB', price: 12000, score: 50, type: 'entry' },
  { name: 'AMD Radeon RX 6500 XT', price: 13500, score: 52, type: 'entry' },
  { name: 'NVIDIA RTX 3050 8GB', price: 21000, score: 65, type: 'mid' },
  { name: 'AMD Radeon RX 6600', price: 22000, score: 68, type: 'mid' },
  { name: 'NVIDIA RTX 3060 12GB', price: 26000, score: 75, type: 'mid-high' },
  { name: 'NVIDIA RTX 4060 8GB', price: 30000, score: 80, type: 'mid-high' },
  { name: 'AMD Radeon RX 6700 XT', price: 33000, score: 82, type: 'mid-high' },
  { name: 'NVIDIA RTX 4070 12GB', price: 55000, score: 90, type: 'high' },
  { name: 'AMD Radeon RX 7800 XT', price: 52000, score: 89, type: 'high' },
  { name: 'NVIDIA RTX 4080 16GB', price: 105000, score: 98, type: 'ultra' },
];

const rams = [
  { name: '8GB DDR4 3200MHz', price: 1800, score: 50, size: 8 },
  { name: '16GB DDR4 3200MHz', price: 3500, score: 75, size: 16 },
  { name: '16GB DDR5 4800MHz', price: 4800, score: 80, size: 16 },
  { name: '32GB DDR4 3600MHz', price: 7000, score: 85, size: 32 },
  { name: '32GB DDR5 5200MHz', price: 9500, score: 92, size: 32 },
  { name: '64GB DDR5 6000MHz', price: 19000, score: 98, size: 64 },
];

const storages = [
  { name: '256GB SATA SSD', price: 1500, score: 40 },
  { name: '512GB NVMe Gen3', price: 3200, score: 65 },
  { name: '1TB NVMe Gen3', price: 5500, score: 75 },
  { name: '1TB NVMe Gen4', price: 7500, score: 85 },
  { name: '2TB NVMe Gen4', price: 12500, score: 95 },
];

// Helper to get random item from array
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Filter components by max budget and sort by performance descending
const getBestComponents = (arr, maxPrice) => {
  const filtered = arr.filter(c => c.price <= maxPrice);
  return filtered.sort((a, b) => b.score - a.score);
};

export const generateConfig = (branch, budgetStr, workload) => {
  const maxTotalBudget = parseBudget(budgetStr);
  
  // Base weights
  let weights = { cpu: 0.35, gpu: 0.40, ram: 0.15, storage: 0.10 };

  // Adjust weights based on workload/branch
  const wl = workload || 'Balanced';
  if (wl === 'Coding' || branch === 'Computer Science') {
    weights = { cpu: 0.45, gpu: 0.15, ram: 0.25, storage: 0.15 };
  } else if (wl === 'CAD' || branch === 'Mechanical' || branch === 'Civil' || branch === 'Design') {
    weights = { cpu: 0.30, gpu: 0.45, ram: 0.15, storage: 0.10 };
  } else if (wl === 'Rendering') {
    weights = { cpu: 0.20, gpu: 0.55, ram: 0.15, storage: 0.10 };
  } else if (wl === 'Simulation' || branch === 'Physics') {
    weights = { cpu: 0.40, gpu: 0.20, ram: 0.30, storage: 0.10 };
  } else if (wl === 'Machine Learning' || branch === 'Data Science') {
    weights = { cpu: 0.20, gpu: 0.50, ram: 0.20, storage: 0.10 };
  }

  // Calculate sub-budgets
  let cpuBudget = maxTotalBudget * weights.cpu;
  let gpuBudget = maxTotalBudget * weights.gpu;
  let ramBudget = maxTotalBudget * weights.ram;
  let storageBudget = maxTotalBudget * weights.storage;

  // Very low budget handling - use integrated graphics to save money for CPU/RAM
  if (maxTotalBudget <= 30000) {
    gpuBudget = 0; // Force integrated graphics
    cpuBudget = maxTotalBudget * 0.50;
    ramBudget = maxTotalBudget * 0.30;
    storageBudget = maxTotalBudget * 0.20;
  }

  // Pick components
  const validCPUs = getBestComponents(cpus, cpuBudget);
  const validGPUs = getBestComponents(gpus, gpuBudget);
  const validRAMs = getBestComponents(rams, ramBudget);
  const validStorages = getBestComponents(storages, storageBudget);

  // Take top 3 of each category to introduce random variation (if available)
  const cpu = validCPUs.length > 0 ? pickRandom(validCPUs.slice(0, Math.min(3, validCPUs.length))) : cpus[0];
  const gpu = validGPUs.length > 0 ? pickRandom(validGPUs.slice(0, Math.min(2, validGPUs.length))) : gpus[0];
  const ram = validRAMs.length > 0 ? pickRandom(validRAMs.slice(0, Math.min(2, validRAMs.length))) : rams[0];
  const storage = validStorages.length > 0 ? pickRandom(validStorages.slice(0, Math.min(2, validStorages.length))) : storages[0];

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (cpu.score * weights.cpu) +
    (gpu.score * weights.gpu) +
    (ram.score * weights.ram) +
    (storage.score * weights.storage)
  );

  // Grade
  let grade = 'B';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B+';

  // Dynamic Reason
  let reason = '';
  if (wl === 'Coding' || wl === 'Simulation') {
    reason = `The ${cpu.name} provides excellent multi-core performance for compiling and simulating. Combined with ${ram.name}, it ensures a smooth bottleneck-free experience within your ${budgetStr} budget.`;
  } else if (wl === 'CAD' || wl === 'Rendering') {
    reason = `For visual workflows, GPU horsepower is critical. We've prioritized the ${gpu.name} to handle complex models and renders effortlessly, while keeping the CPU capable.`;
  } else if (wl === 'Machine Learning') {
    reason = `AI tasks demand VRAM and compute. The ${gpu.name} paired with ${ram.name} gives you the perfect tensor execution sandbox for student-level models.`;
  } else {
    reason = `This is an expertly balanced configuration. The ${cpu.name} and ${gpu.name} combo guarantees smooth performance across all general campus workloads.`;
  }

  if (gpu.name === 'Integrated Graphics') {
    reason = `At this budget tier, we prioritized a strong CPU (${cpu.name}) and sufficient RAM. Relying on integrated graphics keeps costs down without sacrificing overall system snapiness.`;
  }

  // Dynamic Upgrade Path
  const upgradePath = [];
  if (ram.size <= 16) {
    upgradePath.push(`Year 2: Upgrade RAM to ${ram.size * 2}GB for heavier multitasking.`);
  } else {
    upgradePath.push(`Year 2: Add secondary 1TB SSD for project archives.`);
  }
  
  if (gpu.name === 'Integrated Graphics') {
    upgradePath.push(`Year 3: Drop in a dedicated mid-range GPU (like RTX 3050) for massive visual uplift.`);
  } else {
    upgradePath.push(`Year 3: Next-gen GPU platform upgrade.`);
  }
  upgradePath.push(`Year 4: Trade-in system for CampusLoop credit towards a workstation.`);

  return {
    cpu: cpu.name,
    gpu: gpu.name,
    ram: ram.name,
    storage: storage.name,
    score: overallScore,
    grade: grade,
    reason,
    upgradePath
  };
};
