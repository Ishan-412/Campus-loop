import { generateConfig } from '../src/utils/aiEngine.js';

const test = () => {
  const result = generateConfig('Computer Science', '₹1.1L–1.5L', 'Coding', 'Desktop');
  console.log(JSON.stringify(result, null, 2));
};

test();
