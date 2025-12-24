'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Sparkles, 
  Video, 
  Mic, 
  Hash, 
  Download, 
  ChevronRight, 
  Check,
  Loader2,
  Youtube,
  Wand2,
  FileText,
  Image,
  Volume2,
  Tag,
  Package
} from 'lucide-react'

// Types
interface VideoProject {
  niche: string;
  topic: string;
  script: string;
  scenes: Scene[];
  voiceover: VoiceoverData;
  tags: string[];
  title: string;
  description: string;
  thumbnail: string;
}

interface Scene {
  id: number;
  text: string;
  imageUrl: string;
  duration: number;
}

interface VoiceoverData {
  text: string;
  voice: string;
  duration: number;
}

// Niche data
const niches = [
  { id: 'motivation', name: 'Motivation & Self-Improvement', icon: '🔥', color: 'from-orange-500 to-red-500' },
  { id: 'facts', name: 'Interesting Facts', icon: '🧠', color: 'from-purple-500 to-pink-500' },
  { id: 'history', name: 'History & Mysteries', icon: '🏛️', color: 'from-amber-500 to-yellow-500' },
  { id: 'science', name: 'Science & Technology', icon: '🔬', color: 'from-cyan-500 to-blue-500' },
  { id: 'finance', name: 'Finance & Money', icon: '💰', color: 'from-green-500 to-emerald-500' },
  { id: 'horror', name: 'Scary Stories & Creepy', icon: '👻', color: 'from-gray-600 to-gray-800' },
  { id: 'nature', name: 'Nature & Wildlife', icon: '🌿', color: 'from-green-400 to-teal-500' },
  { id: 'space', name: 'Space & Universe', icon: '🚀', color: 'from-indigo-500 to-purple-600' },
]

const voices = [
  { id: 'male-deep', name: 'Deep Male Voice', description: 'Professional, authoritative' },
  { id: 'male-young', name: 'Young Male Voice', description: 'Energetic, friendly' },
  { id: 'female-warm', name: 'Warm Female Voice', description: 'Soothing, engaging' },
  { id: 'female-pro', name: 'Professional Female', description: 'Clear, confident' },
]

// Simulated AI generation functions
const generateScript = async (niche: string, topic: string): Promise<string> => {
  await new Promise(r => setTimeout(r, 2000))
  
  const scripts: Record<string, string> = {
    motivation: `[HOOK]
Did you know that 92% of people never achieve their New Year's resolutions? But here's what the top 8% do differently...

[INTRO]
Welcome back to another powerful video. Today, we're diving deep into the psychology of success and why most people fail before they even start.

[MAIN CONTENT]
The first thing successful people do is they wake up before the world does. Studies show that 90% of CEOs wake up before 6 AM. But it's not just about waking up early – it's about owning your morning.

Second, they practice what psychologists call "future self visualization." They don't just set goals – they literally see themselves achieving those goals. Your brain can't distinguish between a vividly imagined experience and a real one.

Third, and this is crucial – they embrace failure. Every setback is just a setup for a comeback. Michael Jordan missed more than 9,000 shots in his career. He lost almost 300 games. But he's still the greatest of all time.

[CONCLUSION]
Remember, the only difference between who you are and who you want to be is what you do today. Start now. Start small. But START.

If this video inspired you, smash that like button and subscribe for more life-changing content. Your future self will thank you.`,

    facts: `[HOOK]
Your brain uses the same amount of power as a 10-watt light bulb. But what you're about to learn will blow your mind even more...

[INTRO]
Get ready for some of the most incredible facts that will change how you see the world forever.

[MAIN CONTENT]
Fact number one: Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs, and it was still perfectly edible. The secret? Its low moisture content and acidic pH create an inhospitable environment for bacteria.

Fact number two: There are more trees on Earth than stars in the Milky Way. We have about 3 trillion trees, while our galaxy has between 100 to 400 billion stars. Nature is truly incredible.

Fact number three: The shortest war in history lasted only 38 to 45 minutes. It was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after their wooden ships were destroyed by British steel vessels.

[CONCLUSION]
The world is full of mind-blowing facts waiting to be discovered. If you enjoyed these, subscribe and hit the bell for weekly fact videos that'll make you the smartest person in any room.`,

    science: `[HOOK]
Scientists just discovered something that could change everything we know about the universe...

[INTRO]
Welcome to another deep dive into the frontiers of science. What you're about to learn will challenge your understanding of reality itself.

[MAIN CONTENT]
First, let's talk about quantum entanglement. When two particles become entangled, they remain connected regardless of the distance between them. Change one particle, and the other instantly changes too – even if they're on opposite sides of the universe.

Now here's where it gets wild. Recent experiments suggest that time might not be as linear as we think. Some physicists believe the future might influence the past through a phenomenon called retrocausality.

And finally, the observer effect. The simple act of observing a quantum particle changes its behavior. This implies that consciousness itself might play a fundamental role in shaping reality.

[CONCLUSION]
Science is constantly pushing the boundaries of what we thought was possible. Subscribe to stay updated on the latest discoveries that are reshaping our understanding of existence.`,

    history: `[HOOK]
There's a secret room in Mount Rushmore that very few people know about...

[INTRO]
History is full of hidden stories that were never taught in school. Today, we're uncovering some of the most fascinating secrets from the past.

[MAIN CONTENT]
Behind Abraham Lincoln's head on Mount Rushmore, there's a hidden chamber called the Hall of Records. It contains a vault with porcelain enamel panels telling America's history and copies of important documents.

The Great Pyramid of Giza was the tallest structure on Earth for over 3,800 years. It contains enough stone to build a wall around France. And here's the mystery – we still don't know exactly how it was built.

In 1977, we received a signal from space known as the "Wow! Signal." It lasted 72 seconds and came from the constellation Sagittarius. To this day, no one knows what caused it.

[CONCLUSION]
History is stranger than fiction, and there's always more to discover. Subscribe for weekly explorations into the mysteries of our past.`,

    finance: `[HOOK]
Warren Buffett made 99% of his wealth after his 50th birthday. Here's why that matters for you...

[INTRO]
Today we're breaking down the money secrets that the wealthy don't want you to know.

[MAIN CONTENT]
The first secret is compound interest – Einstein called it the eighth wonder of the world. If you invest $500 a month starting at age 25, you'll have over $1.7 million by age 65. Start at 35, and you'll only have $680,000. Time in the market beats timing the market.

Second, wealthy people don't work for money – they make money work for them. They invest in assets that generate passive income: real estate, dividend stocks, and businesses.

Third, they understand the difference between good debt and bad debt. Good debt builds wealth – like a mortgage on a rental property. Bad debt destroys wealth – like credit card debt on depreciating items.

[CONCLUSION]
Financial freedom isn't about how much you earn – it's about how much you keep and how hard it works for you. Subscribe for more wealth-building strategies.`,

    horror: `[HOOK]
What I'm about to tell you happened in 1923... and people still can't explain it.

[INTRO]
Tonight, we're diving into one of the most terrifying true stories ever documented.

[MAIN CONTENT]
The Hinterkaifeck murders remain one of history's most chilling unsolved cases. A family of six was found dead on their isolated German farm. But here's what makes it terrifying – someone had been living in their attic for months before the murders. They found footprints in the snow leading TO the farm, but none leading away.

Even stranger, the livestock had been fed and the farm maintained for several days after the murders. Someone stayed after killing them all.

The most disturbing detail? The youngest victim, a two-year-old girl, had survived long enough to pull her own hair out in clumps. The killer was never found.

[CONCLUSION]
Some mysteries are never meant to be solved. If you dare, subscribe for more terrifying true stories that will keep you up at night.`,

    nature: `[HOOK]
There's a tree in California that's been alive for over 4,800 years...

[INTRO]
Nature's secrets are more incredible than any science fiction. Let's explore the most amazing wonders of our natural world.

[MAIN CONTENT]
The Methuselah tree in California is the oldest known living organism. It was already ancient when the pyramids were built. Its exact location is kept secret to protect it from vandalism.

Deep in the ocean, there are creatures that are essentially immortal. The Turritopsis jellyfish can revert back to its juvenile form after reaching maturity, theoretically living forever.

The Amazon rainforest produces 20% of the world's oxygen and contains 10% of all species on Earth. But here's something mind-blowing – we've only identified about 1% of the species living there.

[CONCLUSION]
Our planet is full of wonders waiting to be discovered. Subscribe to explore more of nature's incredible secrets every week.`,

    space: `[HOOK]
There's a planet made entirely of diamonds... and it's not the strangest thing out there.

[INTRO]
The universe is far stranger and more beautiful than we ever imagined. Let's journey to the edges of known space.

[MAIN CONTENT]
55 Cancri e is a super-Earth made largely of carbon. Under immense pressure, that carbon forms diamonds. The entire planet could be worth 26.9 nonillion dollars – that's a 26 followed by 30 zeros.

There's a cloud of alcohol floating in space. Sagittarius B2 contains enough ethyl alcohol to fill 400 trillion trillion pints of beer. It's 26,000 light-years away, unfortunately.

The most mind-bending fact? The observable universe is 93 billion light-years in diameter, but it's only 13.8 billion years old. That's because space itself is expanding faster than light.

[CONCLUSION]
We are explorers in an infinite cosmos. Subscribe to continue this journey through the wonders of space and time.`,
  }

  return scripts[niche] || scripts['motivation']
}

const generateScenes = async (script: string): Promise<Scene[]> => {
  await new Promise(r => setTimeout(r, 2500))
  
  const paragraphs = script.split('\n\n').filter(p => p.trim().length > 0)
  const scenes: Scene[] = paragraphs.slice(0, 6).map((text, i) => ({
    id: i + 1,
    text: text.replace(/\[.*?\]/g, '').trim(),
    imageUrl: `https://picsum.photos/seed/${Date.now() + i}/1920/1080`,
    duration: Math.floor(text.split(' ').length / 3) + 3
  }))
  
  return scenes
}

const generateVoiceover = async (script: string, voice: string): Promise<VoiceoverData> => {
  await new Promise(r => setTimeout(r, 2000))
  
  const cleanScript = script.replace(/\[.*?\]/g, '').trim()
  const wordCount = cleanScript.split(' ').length
  const duration = Math.floor(wordCount / 2.5) // Average speaking rate
  
  return {
    text: cleanScript,
    voice,
    duration
  }
}

const generateTags = async (niche: string, script: string): Promise<string[]> => {
  await new Promise(r => setTimeout(r, 1500))
  
  const tagsByNiche: Record<string, string[]> = {
    motivation: ['motivation', 'success', 'mindset', 'self improvement', 'personal development', 'inspirational', 'motivational speech', 'life advice', 'growth mindset', 'productivity', 'goal setting', 'discipline', 'success habits', 'morning routine', 'entrepreneur'],
    facts: ['facts', 'interesting facts', 'did you know', 'amazing facts', 'mind blowing', 'education', 'learn something new', 'trivia', 'knowledge', 'fun facts', 'educational content', 'random facts', 'science facts', 'world facts', 'curious'],
    science: ['science', 'physics', 'quantum', 'universe', 'technology', 'scientific discovery', 'space science', 'biology', 'chemistry', 'research', 'innovation', 'stem', 'science explained', 'future technology', 'discoveries'],
    history: ['history', 'historical facts', 'ancient history', 'mysteries', 'unsolved mysteries', 'historical events', 'world history', 'ancient civilizations', 'historical mystery', 'archaeology', 'secret history', 'hidden history', 'history documentary', 'past events'],
    finance: ['finance', 'money', 'investing', 'wealth', 'financial freedom', 'passive income', 'stock market', 'real estate', 'cryptocurrency', 'budgeting', 'money tips', 'financial literacy', 'wealth building', 'retirement', 'compound interest'],
    horror: ['horror', 'scary stories', 'creepy', 'true crime', 'unsolved mysteries', 'paranormal', 'ghost stories', 'true scary stories', 'horror stories', 'creepypasta', 'nightmare', 'terrifying', 'haunted', 'mysterious', 'dark'],
    nature: ['nature', 'wildlife', 'animals', 'earth', 'environment', 'nature documentary', 'amazing nature', 'wildlife documentary', 'natural world', 'ecosystem', 'biodiversity', 'planet earth', 'ocean', 'forest', 'conservation'],
    space: ['space', 'universe', 'astronomy', 'cosmos', 'planets', 'galaxy', 'nasa', 'black holes', 'stars', 'solar system', 'space exploration', 'astrophysics', 'cosmic', 'extraterrestrial', 'space facts'],
  }
  
  return tagsByNiche[niche] || tagsByNiche['motivation']
}

const generateMetadata = async (niche: string, script: string): Promise<{ title: string; description: string; thumbnail: string }> => {
  await new Promise(r => setTimeout(r, 1000))
  
  const titles: Record<string, string[]> = {
    motivation: [
      "This Changes EVERYTHING About Success (Watch Before It's Too Late)",
      "Why 99% of People NEVER Succeed (And How To Be The 1%)",
      "The SECRET Morning Routine of Billionaires Exposed",
    ],
    facts: [
      "50 Mind-Blowing Facts That Will Change How You See The World",
      "Facts So Incredible You Won't Believe They're Real",
      "Your Brain Will Hurt After Watching This (Amazing Facts)",
    ],
    science: [
      "Scientists Just Discovered Something IMPOSSIBLE",
      "This Changes Everything We Know About The Universe",
      "The Truth About Quantum Physics Will SHOCK You",
    ],
    history: [
      "Dark Secrets From History They Don't Want You To Know",
      "The Most MYSTERIOUS Events In Human History",
      "Hidden History: What Really Happened?",
    ],
    finance: [
      "How The Rich REALLY Get Wealthy (Not What You Think)",
      "The Money Secret That Will Change Your Life Forever",
      "Why You're STILL Poor (And How To Fix It)",
    ],
    horror: [
      "The SCARIEST True Story Ever Told",
      "This Happened In 1923... And It's TERRIFYING",
      "I Can't Believe This Is A True Story (Disturbing)",
    ],
    nature: [
      "Nature's Most INCREDIBLE Secrets Revealed",
      "Animals With Powers You Won't Believe Exist",
      "The Most AMAZING Things On Earth",
    ],
    space: [
      "The Universe Is STRANGER Than You Think",
      "NASA Just Found Something IMPOSSIBLE",
      "What They Don't Tell You About Space",
    ],
  }
  
  const descriptions: Record<string, string> = {
    motivation: "Discover the powerful secrets that separate the successful from everyone else. In this video, we reveal the mindset shifts and daily habits that can transform your life. Don't forget to like, subscribe, and turn on notifications!",
    facts: "Prepare to have your mind blown! We've compiled the most incredible, unbelievable, and fascinating facts from around the world. Share this with someone who loves learning new things!",
    science: "Join us on a journey through the most mind-bending scientific discoveries. From quantum physics to the mysteries of the cosmos, prepare to question everything you thought you knew.",
    history: "Uncover the hidden stories and mysterious events from history that were never taught in school. Some secrets were buried for a reason...",
    finance: "Learn the wealth-building strategies used by the world's most successful investors and entrepreneurs. Your financial freedom journey starts here.",
    horror: "Warning: This video contains disturbing content. The following true story has never been fully explained. Watch at your own risk...",
    nature: "Experience the incredible wonders of our natural world. From ancient trees to mysterious creatures, nature never ceases to amaze.",
    space: "Journey beyond the stars to explore the most fascinating objects and phenomena in our universe. Space is full of surprises.",
  }
  
  const selectedTitle = titles[niche]?.[Math.floor(Math.random() * titles[niche].length)] || titles['motivation'][0]
  
  return {
    title: selectedTitle,
    description: descriptions[niche] || descriptions['motivation'],
    thumbnail: `https://picsum.photos/seed/${Date.now()}/1280/720`
  }
}

// Step components
const steps = [
  { id: 1, name: 'Select Niche', icon: Sparkles },
  { id: 2, name: 'Generate Script', icon: FileText },
  { id: 3, name: 'Create Video', icon: Image },
  { id: 4, name: 'Add Voiceover', icon: Volume2 },
  { id: 5, name: 'Generate Tags', icon: Tag },
  { id: 6, name: 'Final Output', icon: Package },
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<Partial<VideoProject>>({})
  const [selectedNiche, setSelectedNiche] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('male-deep')
  const [customTopic, setCustomTopic] = useState('')

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId)
    setProject(prev => ({ ...prev, niche: nicheId }))
  }

  const handleGenerateScript = async () => {
    setLoading(true)
    const script = await generateScript(selectedNiche, customTopic)
    setProject(prev => ({ ...prev, script, topic: customTopic || selectedNiche }))
    setLoading(false)
    setCurrentStep(3)
  }

  const handleGenerateScenes = async () => {
    setLoading(true)
    const scenes = await generateScenes(project.script || '')
    setProject(prev => ({ ...prev, scenes }))
    setLoading(false)
    setCurrentStep(4)
  }

  const handleGenerateVoiceover = async () => {
    setLoading(true)
    const voiceover = await generateVoiceover(project.script || '', selectedVoice)
    setProject(prev => ({ ...prev, voiceover }))
    setLoading(false)
    setCurrentStep(5)
  }

  const handleGenerateTags = async () => {
    setLoading(true)
    const tags = await generateTags(selectedNiche, project.script || '')
    const metadata = await generateMetadata(selectedNiche, project.script || '')
    setProject(prev => ({ 
      ...prev, 
      tags,
      title: metadata.title,
      description: metadata.description,
      thumbnail: metadata.thumbnail
    }))
    setLoading(false)
    setCurrentStep(6)
  }

  const handleStartOver = () => {
    setCurrentStep(1)
    setProject({})
    setSelectedNiche('')
    setCustomTopic('')
    setSelectedVoice('male-deep')
  }

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-youtube/10 rounded-lg">
                <Youtube className="w-6 h-6 text-youtube" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Faceless</span>
                <span className="text-white"> YouTube Agent</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <Wand2 className="w-4 h-4" />
              <span>AI-Powered Video Creation</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-dark-800 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-youtube glow' : 'bg-dark-700'}
                    `}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-dark-400'}`} />
                      )}
                    </div>
                    <span className={`
                      mt-2 text-xs font-medium hidden sm:block
                      ${isCurrent ? 'text-white' : 'text-dark-500'}
                    `}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 sm:w-24 h-0.5 mx-2
                      ${isCompleted ? 'bg-green-500' : 'bg-dark-700'}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Niche Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Choose Your <span className="gradient-text">Niche</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  Select the content category for your faceless YouTube video. This will guide the AI in creating relevant, engaging content.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {niches.map((niche) => (
                  <motion.button
                    key={niche.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNicheSelect(niche.id)}
                    className={`
                      p-6 rounded-2xl border-2 text-left transition-all duration-300 card-hover
                      ${selectedNiche === niche.id 
                        ? 'border-youtube bg-youtube/10' 
                        : 'border-dark-700 bg-dark-800 hover:border-dark-600'}
                    `}
                  >
                    <div className={`
                      text-4xl mb-4 w-16 h-16 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${niche.color}
                    `}>
                      {niche.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{niche.name}</h3>
                    <p className="text-dark-400 text-sm">Create engaging {niche.name.toLowerCase()} content</p>
                  </motion.button>
                ))}
              </div>

              {selectedNiche && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                             hover:bg-red-600 transition-all duration-300 flex items-center gap-2 glow"
                  >
                    Continue to Script Generation
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Script Generation */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Generate Your <span className="gradient-text">Script</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  Our AI will create an engaging script optimized for YouTube&apos;s algorithm and viewer retention.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700">
                  <label className="block text-white font-medium mb-2">
                    Custom Topic (Optional)
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder={`Enter a specific topic for ${niches.find(n => n.id === selectedNiche)?.name || 'your niche'}`}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white
                             placeholder-dark-400 focus:outline-none focus:border-youtube transition-colors"
                  />
                  <p className="text-dark-500 text-sm mt-2">
                    Leave empty to let AI pick the best trending topic
                  </p>
                </div>

                <button
                  onClick={handleGenerateScript}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                           hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 glow
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Script...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate AI Script
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Video Creation */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Create <span className="gradient-text">Video Scenes</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  Review your script and generate AI visuals for each scene.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-youtube" />
                    Generated Script
                  </h3>
                  <div className="prose prose-invert max-h-96 overflow-y-auto">
                    <pre className="text-dark-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                      {project.script}
                    </pre>
                  </div>
                </div>

                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Image className="w-5 h-5 text-youtube" />
                    Scene Preview
                  </h3>
                  
                  {project.scenes ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {project.scenes.map((scene) => (
                        <div key={scene.id} className="p-4 bg-dark-700 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-16 bg-dark-600 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={scene.imageUrl} 
                                alt={`Scene ${scene.id}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">Scene {scene.id}</p>
                              <p className="text-dark-400 text-xs mt-1 line-clamp-2">{scene.text.substring(0, 100)}...</p>
                              <p className="text-dark-500 text-xs mt-1">{scene.duration}s duration</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-dark-500">
                      Click &quot;Generate Scenes&quot; to create AI visuals
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerateScenes}
                  disabled={loading}
                  className="px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                           hover:bg-red-600 transition-all duration-300 flex items-center gap-2 glow
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Scenes...
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      Generate AI Video Scenes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Voiceover */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Add <span className="gradient-text">Voiceover</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  Choose an AI voice to narrate your video content.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {voices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`
                        p-6 rounded-2xl border-2 text-left transition-all duration-300
                        ${selectedVoice === voice.id 
                          ? 'border-youtube bg-youtube/10' 
                          : 'border-dark-700 bg-dark-800 hover:border-dark-600'}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          ${selectedVoice === voice.id ? 'bg-youtube' : 'bg-dark-700'}
                        `}>
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{voice.name}</h3>
                          <p className="text-dark-400 text-sm">{voice.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {project.voiceover && (
                  <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Voiceover Generated</h3>
                    <div className="flex items-center gap-4 p-4 bg-dark-700 rounded-xl">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Volume2 className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Audio Ready</p>
                        <p className="text-dark-400 text-sm">Duration: {project.voiceover.duration} seconds</p>
                      </div>
                      <button className="ml-auto px-4 py-2 bg-dark-600 rounded-lg text-white hover:bg-dark-500 transition-colors">
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleGenerateVoiceover}
                    disabled={loading}
                    className="px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                             hover:bg-red-600 transition-all duration-300 flex items-center gap-2 glow
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating Voiceover...
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        Generate AI Voiceover
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Tags */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Generate <span className="gradient-text">SEO Tags</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  AI will generate optimized tags, title, and description for maximum discoverability.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerateTags}
                    disabled={loading}
                    className="px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                             hover:bg-red-600 transition-all duration-300 flex items-center gap-2 glow
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating Tags & Metadata...
                      </>
                    ) : (
                      <>
                        <Hash className="w-5 h-5" />
                        Generate SEO Tags
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Final Output */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Your Video is <span className="gradient-text">Ready!</span>
                </h1>
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                  Review all components and download your complete video package.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Thumbnail Preview */}
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Thumbnail Preview</h3>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-700">
                    <img 
                      src={project.thumbnail} 
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-xs">
                      {project.voiceover?.duration ? `${Math.floor(project.voiceover.duration / 60)}:${(project.voiceover.duration % 60).toString().padStart(2, '0')}` : '5:00'}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Title & Description</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-dark-400 text-sm">Video Title</label>
                      <p className="text-white font-semibold text-lg mt-1">{project.title}</p>
                    </div>
                    <div>
                      <label className="text-dark-400 text-sm">Description</label>
                      <p className="text-dark-300 text-sm mt-1">{project.description}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700 lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-youtube" />
                    SEO Tags ({project.tags?.length || 0})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-dark-700 text-dark-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video Scenes Summary */}
                <div className="p-6 bg-dark-800 rounded-2xl border border-dark-700 lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-youtube" />
                    Video Scenes ({project.scenes?.length || 0})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {project.scenes?.map((scene) => (
                      <div key={scene.id} className="relative aspect-video rounded-lg overflow-hidden bg-dark-700">
                        <img 
                          src={scene.imageUrl}
                          alt={`Scene ${scene.id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-white text-xs">
                          {scene.duration}s
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartOver}
                  className="px-8 py-4 bg-dark-700 text-white font-semibold rounded-xl 
                           hover:bg-dark-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Create New Video
                </button>
                <button
                  className="px-8 py-4 bg-youtube text-white font-semibold rounded-xl 
                           hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 glow"
                >
                  <Download className="w-5 h-5" />
                  Download Package
                </button>
              </div>

              {/* Export Options */}
              <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-dark-800 to-dark-900 rounded-2xl border border-dark-700">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Package Contents</h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-dark-700/50 rounded-xl text-center">
                    <FileText className="w-8 h-8 text-youtube mx-auto mb-2" />
                    <p className="text-white font-medium">Script</p>
                    <p className="text-dark-400 text-sm">.txt file</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-xl text-center">
                    <Video className="w-8 h-8 text-youtube mx-auto mb-2" />
                    <p className="text-white font-medium">Video</p>
                    <p className="text-dark-400 text-sm">.mp4 file</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-xl text-center">
                    <Volume2 className="w-8 h-8 text-youtube mx-auto mb-2" />
                    <p className="text-white font-medium">Voiceover</p>
                    <p className="text-dark-400 text-sm">.mp3 file</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-xl text-center">
                    <Tag className="w-8 h-8 text-youtube mx-auto mb-2" />
                    <p className="text-white font-medium">Metadata</p>
                    <p className="text-dark-400 text-sm">.json file</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-youtube" />
              <span className="text-dark-400">Faceless YouTube Agent</span>
            </div>
            <p className="text-dark-500 text-sm">
              Powered by AI • Automate your content creation
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
