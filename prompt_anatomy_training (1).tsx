import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Target, FileText, Brain, Shield, Settings, Users } from 'lucide-react';

const PromptAnatomyTraining = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Prompt Anatomy",
      subtitle: "6 Core Blocks for Professional Results",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-xl mb-3 text-blue-900">What is this training about?</h3>
            <p className="text-gray-700 leading-relaxed">
              This training will help you create effective prompts that deliver consistent, 
              professional results. You'll learn a hierarchical structure that transforms 
              chaotic AI communication into a systematic and manageable process.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">✓ After this training you will:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Structure prompts professionally</li>
                <li>• Get predictable results</li>
                <li>• Save time and resources</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">📊 Training duration:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 10 slides</li>
                <li>• Practical exercises</li>
                <li>• ~45 minutes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Practical Task:</strong> Think about one task you'd like to 
              automate or improve using AI. We'll use this example throughout the training.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Hierarchical Structure",
      subtitle: "From most important to additional parameters",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Why is hierarchy important?</h3>
            <p className="text-gray-700 mb-4">
              AI models read and process information sequentially. The most important information 
              needs to be presented first so that the result matches your expectations.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { num: "1", name: "Meta block", priority: "Critical", color: "red" },
              { num: "2", name: "Input block", priority: "Very important", color: "orange" },
              { num: "3", name: "Output block", priority: "Very important", color: "orange" },
              { num: "4", name: "Reasoning block", priority: "Important", color: "yellow" },
              { num: "5", name: "Quality control", priority: "Recommended", color: "green" },
              { num: "6", name: "Advanced parameters", priority: "Optional", color: "blue" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                  {item.num}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {item.priority}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Practical Task:</strong> Try creating a prompt without structure (as you 
              usually would). Save it - we'll compare it with the structured version at the end.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "1. Meta Block",
      subtitle: "Role and context - who are you and what do you do?",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-red-900">Question: Who are you and what do you do?</h3>
            <p className="text-gray-700">
              The Meta block establishes the AI's identity and context. It's like a job description 
              that determines how the AI interprets your task.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
              <h4 className="font-semibold text-red-600 mb-3">❌ Bad example:</h4>
              <p className="text-sm text-gray-600 italic">
                Create a sales report for me.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Problem: unclear what perspective to apply
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-semibold text-green-600 mb-3">✓ Good example:</h4>
              <p className="text-sm text-gray-700 italic">
                You are a senior business analyst with 10 years of experience in e-commerce. 
                Your goal is to prepare a sales report for board members who will make 
                strategic decisions for Q4.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Meta block components:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Role:</strong> specialty, experience level</li>
              <li><strong>Domain context:</strong> industry, specifics</li>
              <li><strong>Target audience:</strong> who the result is for</li>
              <li><strong>Business context:</strong> why this matters</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Create a meta block for your chosen task
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="You are [role] with [experience] in [domain]. Your goal is..."
            />
          </div>
        </div>
      )
    },
    {
      title: "2. Input Block",
      subtitle: "Factual information, data, and constraints",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-orange-900">Question: What factual information, data, constraints?</h3>
            <p className="text-gray-700">
              The Input block specifies CONCRETE data that the AI should work with. 
              Clear input = clear output.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-semibold mb-3">What to include in the Input block?</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Specific numbers, dates, metrics</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Document excerpts or references</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Constraints (budget, time)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Rules, standards, guidelines</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <p className="text-xs text-red-700 font-semibold mb-2">❌ Non-specific input:</p>
                <p className="text-sm italic">Evaluate our sales.</p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="text-xs text-green-700 font-semibold mb-2">✓ Specific input:</p>
                <p className="text-sm italic">
                  Evaluate Q3 2024 sales. Data: 250k EUR revenue (+15% vs Q2), 
                  1200 orders, average check 208 EUR.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Describe the inputs for your task
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="Data: [numbers, facts]..."
            />
          </div>
        </div>
      )
    },
    {
      title: "3. Output Block",
      subtitle: "Result format and structure requirements",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-orange-900">Question: What format and structure do I want?</h3>
            <p className="text-gray-700">
              The Output block specifies the EXACT result format. This eliminates unnecessary 
              correction iteration cycles.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
            <h4 className="font-semibold mb-3">Example: Training program plan</h4>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="text-blue-600 mb-2">Table with columns:</p>
              <div className="space-y-1 text-xs">
                <p>• Module - name and number</p>
                <p>• Duration - minutes</p>
                <p>• Goal - what participants will learn</p>
                <p>• Activity - specific methods</p>
                <p>• Result - measurable outcome</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-900">Format types:</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>📊 Table</li>
                <li>📝 Document</li>
                <li>📑 List</li>
                <li>📈 Chart</li>
                <li>💻 Code</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-green-900">Requirements:</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>📏 Length</li>
                <li>🎯 Level of detail</li>
                <li>👔 Tone</li>
                <li>🌍 Language</li>
                <li>📎 Attachments</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Describe the exact output format
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="Format: [table/text/list]..."
            />
          </div>
        </div>
      )
    },
    {
      title: "4. Reasoning Block",
      subtitle: "Thinking structure before answering",
      icon: Brain,
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-yellow-900">Question: How to think before providing an answer?</h3>
            <p className="text-gray-700">
              The Reasoning block tells the AI what logic to apply. This improves decision 
              quality and helps avoid superficial answers.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-4">6-step thinking structure:</h4>
            <div className="space-y-3">
              {[
                { num: 1, step: "Define the problem", desc: "What is the real problem?" },
                { num: 2, step: "Analyze the data", desc: "What data do we have?" },
                { num: 3, step: "Identify missing elements", desc: "What's missing?" },
                { num: 4, step: "Options", desc: "What are possible solutions?" },
                { num: 5, step: "Trade-offs", desc: "Pros and cons of each?" },
                { num: 6, step: "Conclusion", desc: "Recommendation with rationale" }
              ].map((item) => (
                <div key={item.num} className="flex gap-3 items-start bg-white p-3 rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.step}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Create a reasoning structure
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="1) First...&#10;2) Then...&#10;3) Finally..."
            />
          </div>
        </div>
      )
    },
    {
      title: "5. Quality Control",
      subtitle: "Quality criteria and validation",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-green-900">How to check result quality?</h3>
            <p className="text-gray-700">
              The Quality control block sets criteria by which the AI evaluates 
              its own work before presenting the result.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
            <h4 className="font-semibold mb-4">Universal quality criteria:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                <span>✓</span>
                <span>Logical flow - information follows logically</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                <span>✓</span>
                <span>Completeness - all questions answered</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                <span>✓</span>
                <span>Factual accuracy - all data is correct</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                <span>✓</span>
                <span>Diverse activities - not just one approach</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-pink-50 rounded">
                <span>✓</span>
                <span>Measurable results - has KPIs</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Set 3-5 quality criteria
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="1) Is...?&#10;2) Does...?&#10;3) Are...?"
            />
          </div>
        </div>
      )
    },
    {
      title: "6. Advanced Parameters",
      subtitle: "Advanced parameters and model specifics",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-blue-900">What model-specific parameters?</h3>
            <p className="text-gray-700">
              The Advanced parameters block allows precise control of AI behavior. 
              This block is optional but can significantly improve results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold mb-3 text-purple-900">🎨 Temperature</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <p>Low (0.0-0.3) - Factual</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p>Medium (0.4-0.7) - Balanced</p>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <p>High (0.8-1.0) - Creative</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold mb-3 text-green-900">🧠 Reasoning depth</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <p>Fast - Simple questions</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p>Normal - Standard tasks</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <p>Deep - Complex analysis</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900 mb-3">
              <strong>Practical Task:</strong> Specify 2-3 advanced parameters
            </p>
            <textarea 
              className="w-full h-24 p-3 border rounded text-sm"
              placeholder="Temperature: [0-1]&#10;Reasoning: [fast/normal/deep]..."
            />
          </div>
        </div>
      )
    },
    {
      title: "Practical Example",
      subtitle: "Complete prompt example with all blocks",
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-300">
            <h3 className="font-bold mb-2">Task: Q4 Sales Strategy Presentation</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
              <p className="text-xs font-bold text-red-700 mb-1">1. META</p>
              <p className="text-xs">You are a senior business strategist with 12 years of B2B SaaS experience...</p>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
              <p className="text-xs font-bold text-orange-700 mb-1">2. INPUT</p>
              <p className="text-xs">Q1-Q3 2024: 2.1M EUR (+22% YoY), 156 new clients...</p>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
              <p className="text-xs font-bold text-yellow-700 mb-1">3. OUTPUT</p>
              <p className="text-xs">10 slides: Executive Summary, Current Situation, Competitors...</p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-bold text-green-700 mb-1">4. REASONING</p>
              <p className="text-xs">1) Define key message 2) Analyze data 3) Options...</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-bold text-blue-700 mb-1">5. QUALITY</p>
              <p className="text-xs">✓ Clear message ✓ Data-backed ✓ Realistic ROI...</p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs font-bold text-purple-700 mb-1">6. ADVANCED</p>
              <p className="text-xs">Temperature: 0.4, Reasoning: Deep, Language: EN...</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Practical Task:</strong> Create YOUR complete prompt with all 6 blocks
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Before and After",
      subtitle: "Comparison: unstructured vs structured",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
              <h4 className="font-bold text-red-900 mb-3">❌ Unstructured</h4>
              <div className="bg-white p-3 rounded text-sm italic text-gray-700">
                <p>Make me a training program about AI. Should be interesting and practical.</p>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-700">
                <p>⚠️ Unclear target audience</p>
                <p>⚠️ No specific data</p>
                <p>⚠️ Undefined format</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-green-900 mb-3">✅ Structured</h4>
              <div className="bg-white p-3 rounded text-xs text-gray-700 max-h-40 overflow-y-auto">
                <p className="font-semibold text-red-700">META: You are a training developer...</p>
                <p className="font-semibold text-orange-700 mt-1">INPUT: 4 hours, 12-15 people...</p>
                <p className="font-semibold text-yellow-700 mt-1">OUTPUT: Table with 5 columns...</p>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-700">
                <p>✅ Clear audience</p>
                <p>✅ Specific parameters</p>
                <p>✅ Precise format</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">📊 Results comparison:</h4>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-red-600">40%</p>
                <p className="text-xs">unstructured</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs">structured</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-blue-600">60%</p>
                <p className="text-xs">fewer corrections</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Practical Task:</strong> Compare your first prompt with the new structured version
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Summary",
      subtitle: "Key insights and next steps",
      icon: CheckCircle,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-xl mb-3">🎯 What you've learned</h3>
            <p className="text-gray-700">
              Congratulations! You now know how to professionally structure prompts using the 6-block system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">📚 6 core blocks:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>1️⃣ Meta - role and context</p>
                <p>2️⃣ Input - data and constraints</p>
                <p>3️⃣ Output - format requirements</p>
                <p>4️⃣ Reasoning - thinking structure</p>
                <p>5️⃣ Quality - quality criteria</p>
                <p>6️⃣ Advanced - parameters</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">✨ Key insights:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Hierarchy is critical</li>
                <li>✓ Specificity > generalities</li>
                <li>✓ Examples improve results</li>
                <li>✓ Quality control is essential</li>
                <li>✓ Templates save time</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-3">🚀 Next steps:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Create 3 prompts this week using the 6-block structure</p>
              <p>2. Compare results with old methods</p>
              <p>3. Document best examples in your prompt library</p>
              <p>4. Share knowledge with your team</p>
              <p>5. Keep improving - each prompt is a learning opportunity</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
            <h4 className="font-semibold text-yellow-900 mb-3">💡 Remember:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Quality > Speed:</strong> 5 minutes for a well-structured prompt saves hours in corrections</p>
              <p><strong>Iterate:</strong> First attempt is rarely perfect - learn and improve</p>
              <p><strong>Document:</strong> Good prompts are reusable assets</p>
              <p><strong>Share:</strong> Best way to learn - teach others</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Good Luck with AI!</h3>
            <p className="text-sm opacity-90">
              Structured prompts = predictable results = greater efficiency
            </p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300">
            <p className="text-sm text-green-900 font-semibold mb-2">
              📋 Final Task:
            </p>
            <p className="text-sm text-gray-700">
              Create a complete prompt for one task you'll do this week. 
              Test it and share the results with your team!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 md:p-3 rounded-lg">
              <CurrentIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 truncate">{slides[currentSlide].title}</h1>
              <p className="text-sm md:text-base text-gray-600">{slides[currentSlide].subtitle}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs md:text-sm text-gray-500">Slide</p>
              <p className="text-lg md:text-2xl font-bold text-blue-600">{currentSlide + 1}/{slides.length}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-4 md:mb-6 min-h-[400px] md:min-h-[500px] overflow-y-auto max-h-[calc(100vh-250px)]">
          {slides[currentSlide].content}
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="flex gap-1 md:gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'bg-blue-500 w-6 md:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">→</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 hidden sm:block" />
          </button>
        </div>

        {currentSlide > 0 && currentSlide < slides.length - 1 && (
          <div className="mt-4 text-center">
            <p className="text-xs md:text-sm text-gray-500">
              💡 Complete practical tasks in each slide
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptAnatomyTraining;