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

export const deviceTypes = ['Desktop', 'Laptop'];

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

// --- DATASETS (DESKTOP) ---

const cpus = [
  { name: 'Intel Core i3-12100F', price: 8000, score: 55, brand: 'Intel' },
  { name: 'AMD Ryzen 3 4100', price: 6500, score: 50, brand: 'AMD' },
  { name: 'Intel Core i5-12400F', price: 12000, score: 70, brand: 'Intel' },
  { name: 'AMD Ryzen 5 5600', price: 13000, score: 72, brand: 'AMD' },
  { name: 'Intel Core i5-13400F', price: 18000, score: 82, brand: 'Intel' },
  { name: 'AMD Ryzen 5 7600X', price: 20000, score: 85, brand: 'AMD' },
  { name: 'Intel Core i7-13700K', price: 35000, score: 92, brand: 'Intel' },
  { name: 'AMD Ryzen 7 7800X3D', price: 35000, score: 95, brand: 'AMD' },
];

const gpus = [
  { name: 'Integrated Graphics', price: 0, score: 30, tier: 0 },
  { name: 'NVIDIA GTX 1650 4GB', price: 11000, score: 50, tier: 1 },
  { name: 'AMD Radeon RX 6500 XT', price: 12500, score: 52, tier: 1 },
  { name: 'NVIDIA RTX 3050 8GB', price: 20000, score: 65, tier: 2 },
  { name: 'AMD Radeon RX 6600', price: 21000, score: 68, tier: 2 },
  { name: 'NVIDIA RTX 3060 12GB', price: 25000, score: 75, tier: 3 },
  { name: 'NVIDIA RTX 4060 8GB', price: 28000, score: 80, tier: 3 },
  { name: 'AMD Radeon RX 6700 XT', price: 32000, score: 82, tier: 3 },
  { name: 'NVIDIA RTX 4070 12GB', price: 54000, score: 90, tier: 4 },
  { name: 'AMD Radeon RX 7800 XT', price: 50000, score: 89, tier: 4 },
];

const rams = [
  { name: '8GB DDR4 3200MHz', price: 2000, score: 50, size: 8 },
  { name: '16GB DDR4 3200MHz', price: 3500, score: 75, size: 16 },
  { name: '16GB DDR5 4800MHz', price: 4500, score: 80, size: 16 },
  { name: '32GB DDR4 3600MHz', price: 6500, score: 85, size: 32 },
  { name: '32GB DDR5 5200MHz', price: 9000, score: 92, size: 32 },
  { name: '64GB DDR5 6000MHz', price: 18000, score: 98, size: 64 },
];

const storages = [
  { name: '256GB SATA SSD', price: 1500, score: 40, size: 256 },
  { name: '512GB NVMe Gen3', price: 3000, score: 65, size: 512 },
  { name: '1TB NVMe Gen3', price: 5000, score: 75, size: 1024 },
  { name: '1TB NVMe Gen4', price: 7000, score: 85, size: 1024 },
  { name: '2TB NVMe Gen4', price: 12000, score: 95, size: 2048 },
];

// Random Helpers
const pickRandom = (arr, seed) => {
  if (arr.length === 0) return null;
  // A simple pseudo-random hash based on string seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  const index = Math.abs(hash) % arr.length;
  return arr[index];
};

const pickTrulyRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Ensure cost fits budget constraints
const validateBuild = (cpu, gpu, ram, storage, otherCost) => {
  return cpu.price + gpu.price + ram.price + storage.price + otherCost;
};

const getDesktopConfig = (branch, budgetStr, workload) => {
  const maxBudget = parseBudget(budgetStr);
  const otherCost = 10000; // Case, PSU, Mobo

  // Base Weights: CPU ~30%, GPU ~40%, RAM ~15%, Storage ~15%
  let cpuB = (maxBudget - otherCost) * 0.30;
  let gpuB = (maxBudget - otherCost) * 0.40;
  let ramB = (maxBudget - otherCost) * 0.15;
  let stoB = (maxBudget - otherCost) * 0.15;

  // Hard constraints
  let maxGpuTier = 4;
  let minGpuTier = 0;
  let maxRamSize = 64;
  let maxStorageSize = 2048;

  if (maxBudget < 40000) {
    maxGpuTier = 0; // Integrated only
  } else if (maxBudget <= 60000) {
    maxGpuTier = 1; // GTX 1650 class
    maxRamSize = 16;
  } else if (maxBudget <= 80000) {
    maxGpuTier = 3; // RTX 3050/3060
    maxStorageSize = 1024; // No 2TB
  } else {
    minGpuTier = 3; // RTX 3060+
  }

  // Filter components by constraints
  const availableGPUs = gpus.filter(g => g.tier >= minGpuTier && g.tier <= maxGpuTier);
  const availableRAMs = rams.filter(r => r.size <= maxRamSize);
  const availableStorages = storages.filter(s => s.size <= maxStorageSize);

  // Force Alternating CPUs
  const budgetIndex = budgets.indexOf(budgetStr);
  const forcedBrand = budgetIndex % 2 === 0 ? 'Intel' : 'AMD';
  const availableCPUs = cpus.filter(c => c.brand === forcedBrand);

  // Initial selection
  const filterByBudget = (arr, b) => arr.filter(x => x.price <= b).sort((a,b) => b.score - a.score);
  
  let cpuOpts = filterByBudget(availableCPUs, cpuB);
  let gpuOpts = filterByBudget(availableGPUs, gpuB);
  let ramOpts = filterByBudget(availableRAMs, ramB);
  let stoOpts = filterByBudget(availableStorages, stoB);

  // Fallbacks if budget is too tight
  if (cpuOpts.length === 0) cpuOpts = [availableCPUs[0]];
  if (gpuOpts.length === 0) gpuOpts = [availableGPUs[0]];
  if (ramOpts.length === 0) ramOpts = [availableRAMs[0]];
  if (stoOpts.length === 0) stoOpts = [availableStorages[0]];

  // Pick deterministic random top candidates
  const seed = budgetStr + workload + branch;
  let cpu = pickRandom(cpuOpts.slice(0, 2), seed + 'c');
  let gpu = pickRandom(gpuOpts.slice(0, 2), seed + 'g');
  let ram = pickRandom(ramOpts.slice(0, 2), seed + 'r');
  let storage = pickRandom(stoOpts.slice(0, 2), seed + 's');

  // Validation & Auto-Adjustment Loop
  let totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
  
  while (totalCost > maxBudget) {
    // Try to downgrade GPU first
    const cheaperGPUs = filterByBudget(availableGPUs, gpu.price - 1000);
    if (cheaperGPUs.length > 0 && gpu.tier > 0) {
      gpu = cheaperGPUs[0];
    } else {
      // Downgrade CPU
      const cheaperCPUs = filterByBudget(availableCPUs, cpu.price - 1000);
      if (cheaperCPUs.length > 0) cpu = cheaperCPUs[0];
      else break; // Can't downgrade further
    }
    totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
  }

  // If we have excess budget, upgrade RAM/Storage
  if (totalCost < maxBudget - 5000) {
    const betterRAMs = availableRAMs.filter(r => r.price > ram.price && r.price <= ram.price + (maxBudget - totalCost));
    if (betterRAMs.length > 0) {
      ram = betterRAMs[betterRAMs.length - 1]; // Pick most expensive within budget
      totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
    }
    const betterStorages = availableStorages.filter(s => s.price > storage.price && s.price <= storage.price + (maxBudget - totalCost));
    if (betterStorages.length > 0 && totalCost < maxBudget - 3000) {
      storage = betterStorages[betterStorages.length - 1];
      totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
    }
  }

  const overallScore = Math.round((cpu.score*0.3) + (gpu.score*0.4) + (ram.score*0.15) + (storage.score*0.15));
  let grade = overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 70 ? 'B+' : 'B';

  let reason = `At an estimated component cost of ₹${totalCost.toLocaleString()}, this ${cpu.brand} build offers peak value. `;
  if (gpu.tier === 0) reason += `We prioritized the CPU (${cpu.name}) and fast storage to stay within the strict budget constraints.`;
  else reason += `The ${gpu.name} paired with ${ram.size}GB RAM easily handles complex ${workload || branch} tasks.`;

  return {
    specs: [
      { icon: 'Cpu', label: 'Processor', value: cpu.name },
      { icon: 'Zap', label: 'Graphics', value: gpu.name },
      { icon: 'HardDrive', label: 'Memory', value: ram.name },
      { icon: 'Binary', label: 'Storage', value: storage.name },
    ],
    estimatedCost: `₹${totalCost.toLocaleString()}`,
    score: overallScore,
    grade,
    reason,
    upgradePath: [
      `Year 2: Upgrade RAM to ${ram.size * 2}GB.`,
      gpu.tier === 0 ? `Year 3: Add dedicated GPU (RTX 3050).` : `Year 3: Upgrade to Next-Gen GPU.`,
      `Year 4: Trade-in for CampusLoop Credit.`
    ]
  };
};

const getLaptopConfig = (branch, budgetStr, workload) => {
  const maxBudget = parseBudget(budgetStr);
  
  let cpu, ram, gpu, storage;
  let score, grade;

  if (maxBudget <= 35000) {
    cpu = pickTrulyRandom(['Intel Core i5 8th Gen', 'Intel Core i5 10th Gen', 'AMD Ryzen 3 3200U']);
    ram = '8GB DDR4';
    gpu = 'Intel UHD / AMD Vega';
    storage = '256GB SSD';
    score = 65; grade = 'B';
  } else if (maxBudget <= 55000) {
    cpu = pickTrulyRandom(['Intel Core i5 11th Gen', 'AMD Ryzen 5 5500U', 'Intel Core i7 10th Gen']);
    ram = '16GB DDR4';
    gpu = pickTrulyRandom(['Intel Iris Xe', 'NVIDIA MX350', 'GTX 1650 (Mobile)']);
    storage = '512GB NVMe SSD';
    score = 78; grade = 'B+';
  } else {
    cpu = pickTrulyRandom(['Intel Core i7 12th Gen', 'AMD Ryzen 7 5800H', 'AMD Ryzen 9 5900HX']);
    ram = pickTrulyRandom(['16GB DDR5', '32GB DDR4']);
    gpu = pickTrulyRandom(['RTX 3050 Ti (Mobile)', 'RTX 3060 (Mobile)']);
    storage = '1TB NVMe SSD';
    score = 92; grade = 'A';
  }

  const battery = pickTrulyRandom(['85% Capacity', '90% Capacity', '94% Capacity', '100% (New Battery)']);
  const condition = pickTrulyRandom(['Grade A (Like New)', 'Grade A- (Minor Scratches)', 'Grade B+ (Good)']);
  const display = pickTrulyRandom(['14" FHD IPS', '15.6" FHD 144Hz', '13.3" Retina/FHD']);

  const estimatedCost = Math.round(maxBudget * (0.85 + Math.random() * 0.1)); // 85% to 95% of max budget

  const reason = `This CampusLoop Certified Refurbished laptop offers an incredible value at roughly ₹${estimatedCost.toLocaleString()}. With ${battery} and ${condition} exterior, it provides premium performance for ${workload || branch} workloads at a fraction of the retail price.`;

  return {
    specs: [
      { icon: 'Cpu', label: 'Processor', value: cpu },
      { icon: 'Zap', label: 'Graphics', value: gpu },
      { icon: 'HardDrive', label: 'Memory & Storage', value: `${ram} + ${storage}` },
      { icon: 'Binary', label: 'Display', value: display },
      { icon: 'Check', label: 'Condition', value: condition },
      { icon: 'TrendingUp', label: 'Battery Health', value: battery },
    ],
    estimatedCost: `₹${estimatedCost.toLocaleString()}`,
    score,
    grade,
    reason,
    upgradePath: [
      `Year 1: Claim included 1-Year Warranty if any issues arise.`,
      `Year 2: Utilize free interior cleaning service.`,
      `Year 3: Battery replacement if capacity drops below 70%.`,
      `Year 4: Trade-in for upgraded model.`
    ]
  };
};

export const generateConfig = (deviceType, branch, budgetStr, workload) => {
  if (deviceType === 'Laptop') {
    return getLaptopConfig(branch, budgetStr, workload);
  }
  return getDesktopConfig(branch, budgetStr, workload);
};
