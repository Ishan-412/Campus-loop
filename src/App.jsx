import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIRecommender from './components/AIRecommender';
import PreInstalledSoftware from './components/PreInstalledSoftware';
import HowItWorks from './components/HowItWorks';
import TradeIn from './components/TradeIn';
import QualityCheck from './components/QualityCheck';
import PCBuilder from './components/PCBuilder';
import ValueProposition from './components/ValueProposition';
import EnvironmentalImpact from './components/EnvironmentalImpact';
import FinalCTA from './components/FinalCTA';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white selection:bg-violet-500/30">
      <CustomCursor />
      <Navbar />
      <Hero />
      <AIRecommender />
      <PreInstalledSoftware />
      <HowItWorks />
      <TradeIn />
      <QualityCheck />
      <PCBuilder />
      <ValueProposition />
      <EnvironmentalImpact />
      <FinalCTA />
    </div>
  );
}
