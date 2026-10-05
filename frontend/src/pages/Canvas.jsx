import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Canvas as FabricCanvas, Rect, Circle, Shadow, IText } from 'fabric'
import { 
  Undo, 
  Redo, 
  RotateCcw, 
  Trash2, 
  Type, 
  Square, 
  Circle as CircleIcon, 
  Download, 
  Share2, 
  Grid, 
  Eye, 
  EyeOff, 
  Plus, 
  Sliders, 
  Check, 
  Eraser, 
  MousePointer, 
  Sparkles, 
  Layers, 
  Info,
  ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Canvas() {
  const { id } = useParams()
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)

  // Editor states
  const [tool, setTool] = useState('select') // select, pen, text, shape
  const [color, setColor] = useState('#C9A96E')
  const [brushSize, setBrushSize] = useState(5)
  const [paperTexture, setPaperTexture] = useState('parchment') // parchment, linen, textured, black
  const [gridVisible, setGridVisible] = useState(true)
  const [slantGuide, setSlantGuide] = useState(false)
  const [shadowBlur, setShadowBlur] = useState(2) // Ink bleeding effect
  const [textVal, setTextVal] = useState('CalliVerse')
  const [activeFont, setActiveFont] = useState('Cormorant Garamond')

  // Undo/Redo history stacks
  const historyRef = useRef([])
  const redoRef = useRef([])

  const textures = [
    { id: 'parchment', name: 'Vintage Parchment', bg: '#F2ECE0', image: 'https://www.transparenttextures.com/patterns/parchment.png' },
    { id: 'linen', name: 'Fine Linen', bg: '#F8F5F0', image: 'https://www.transparenttextures.com/patterns/linen.png' },
    { id: 'textured', name: 'Handmade Rice Paper', bg: '#EFEAE0', image: 'https://www.transparenttextures.com/patterns/rice-paper.png' },
    { id: 'black', name: 'Dark Slate Canvas', bg: '#1A1714', image: 'https://www.transparenttextures.com/patterns/dark-matter.png' },
  ]

  const fonts = [
    'Cormorant Garamond',
    'Dancing Script',
    'Playfair Display',
    'IM Fell English',
    'Georgia',
    'Courier New'
  ]

  // Initializing fabric canvas
  useEffect(() => {
    const fabricCanvas = new FabricCanvas('drawing-canvas', {
      width: 750,
      height: 520,
      backgroundColor: '#F2ECE0',
      isDrawingMode: false,
    })

    setCanvas(fabricCanvas)
    
    // Save initial state for history
    const json = JSON.stringify(fabricCanvas.toJSON())
    historyRef.current = [json]

    // Set brush settings
    fabricCanvas.freeDrawingBrush.color = color
    fabricCanvas.freeDrawingBrush.width = brushSize

    // Event listener for state changes to save history
    fabricCanvas.on('object:added', () => saveHistory(fabricCanvas))
    fabricCanvas.on('object:modified', () => saveHistory(fabricCanvas))
    fabricCanvas.on('object:removed', () => saveHistory(fabricCanvas))

    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  // Sync brush parameters & tools
  useEffect(() => {
    if (!canvas) return

    if (tool === 'pen') {
      canvas.isDrawingMode = true
      canvas.freeDrawingBrush.color = color
      canvas.freeDrawingBrush.width = Number(brushSize)
      // Custom shadow blur to simulate ink feathering / bleeding
      canvas.freeDrawingBrush.shadow = new Shadow({
        color: color,
        blur: Number(shadowBlur),
        affectStroke: true,
      })
    } else if (tool === 'eraser') {
      canvas.isDrawingMode = true
      // Simulating eraser using background color match
      const activeTexture = textures.find(t => t.id === paperTexture)
      canvas.freeDrawingBrush.color = activeTexture ? activeTexture.bg : '#F2ECE0'
      canvas.freeDrawingBrush.width = Number(brushSize) * 2
      canvas.freeDrawingBrush.shadow = null
    } else {
      canvas.isDrawingMode = false
    }
  }, [tool, color, brushSize, shadowBlur, paperTexture, canvas])

  // Save history state
  const saveHistory = (c) => {
    const json = JSON.stringify(c.toJSON())
    // Prevent duplicated states
    if (historyRef.current[historyRef.current.length - 1] !== json) {
      historyRef.current.push(json)
      redoRef.current = [] // clear redo stack
    }
  }

  // Undo/Redo
  const handleUndo = () => {
    if (historyRef.current.length > 1) {
      const current = historyRef.current.pop()
      redoRef.current.push(current)
      const prev = historyRef.current[historyRef.current.length - 1]
      canvas.loadFromJSON(prev, () => {
        canvas.renderAll()
      })
    } else {
      toast.error('Nothing to undo')
    }
  }

  const handleRedo = () => {
    if (redoRef.current.length > 0) {
      const next = redoRef.current.pop()
      historyRef.current.push(next)
      canvas.loadFromJSON(next, () => {
        canvas.renderAll()
      })
    } else {
      toast.error('Nothing to redo')
    }
  }

  // Apply Texture
  const applyTexture = (textureId) => {
    setPaperTexture(textureId)
    const selected = textures.find(t => t.id === textureId)
    if (canvas && selected) {
      canvas.setBackgroundColor(selected.bg, () => {
        canvas.setBackgroundImage(selected.image, () => {
          canvas.renderAll()
          saveHistory(canvas)
        }, {
          opacity: 0.15,
          repeat: 'repeat'
        })
      })
    }
  }

  // Adding Elements
  const addText = () => {
    if (!canvas) return
    const text = new IText(textVal, {
      left: 100,
      top: 150,
      fontFamily: activeFont,
      fill: color,
      fontSize: 40,
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    setTool('select')
  }

  const addShape = (shapeType) => {
    if (!canvas) return
    let shape
    if (shapeType === 'square') {
      shape = new Rect({
        left: 150,
        top: 150,
        fill: 'transparent',
        stroke: color,
        strokeWidth: 3,
        width: 100,
        height: 100,
      })
    } else {
      shape = new Circle({
        left: 150,
        top: 150,
        fill: 'transparent',
        stroke: color,
        strokeWidth: 3,
        radius: 50,
      })
    }
    canvas.add(shape)
    canvas.setActiveObject(shape)
    setTool('select')
  }


  // Clean whole canvas
  const clearCanvas = () => {
    if (!canvas) return
    canvas.clear()
    applyTexture(paperTexture)
    toast.success('Canvas cleared')
  }

  // Export Design
  const exportDesign = () => {
    if (!canvas) return
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    })
    const link = document.createElement('a')
    link.download = 'CalliVerse-Artwork.png'
    link.href = dataURL
    link.click()
    toast.success('Artwork exported successfully as PNG!')
  }

  // Save to db & show QR Generation simulation
  const handleSaveAndShare = async () => {
    try {
      const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 })
      const res = await axios.post('/api/designs', {
        title: 'My Custom Ink Masterpiece',
        canvasJSON: JSON.stringify(canvas.toJSON()),
        thumbnailUrl: dataURL,
        category: 'poster',
        tags: ['ink', 'calligraphy', 'artwork'],
        isPublic: true,
      })
      toast.success('Design saved & shareable QR code generated!')
      navigate(`/artwork/${res.data._id}`)
    } catch (err) {
      toast.error('Failed to save design. Using mock QR preview instead.')
      navigate('/artwork/demo-id')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in relative z-10">
      
      {/* Editor Header / Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-2xl font-semibold font-display text-neutral-100 flex items-center gap-2">
            CalliVerse Studio Canvas <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500/10 animate-pulse" />
          </h1>
          <p className="text-xs text-neutral-400">Craft elegant vector & raster calligraphy styles with ink effects.</p>
        </div>

        {/* Undo, Redo, Clear, Share */}
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handleUndo} className="p-2.5 rounded-xl bg-neutral-900 border border-amber-900/20 text-neutral-400 hover:text-amber-400 transition-all duration-300" title="Undo">
            <Undo className="w-4 h-4" />
          </button>
          <button onClick={handleRedo} className="p-2.5 rounded-xl bg-neutral-900 border border-amber-900/20 text-neutral-400 hover:text-amber-400 transition-all duration-300" title="Redo">
            <Redo className="w-4 h-4" />
          </button>
          <button onClick={clearCanvas} className="p-2.5 rounded-xl bg-neutral-900 border border-red-900/30 text-neutral-400 hover:text-red-400 transition-all duration-300" title="Clear Canvas">
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-amber-900/20 mx-2" />

          <button onClick={exportDesign} className="btn btn-ghost btn-sm flex items-center gap-1.5 hover:border-amber-500">
            <Download className="w-4 h-4" /> Export PNG
          </button>

          <button onClick={handleSaveAndShare} className="btn btn-primary btn-sm flex items-center gap-1.5">
            <Share2 className="w-4 h-4" /> Save & Share QR
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Tool Selector */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-amber-900/15 space-y-3">
            <label className="label">Active Studio Tool</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setTool('select')}
                className={`p-3 rounded-lg text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all duration-300 ${
                  tool === 'select' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <MousePointer className="w-4 h-4" />
                Select / Move
              </button>
              
              <button 
                onClick={() => setTool('pen')}
                className={`p-3 rounded-lg text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all duration-300 ${
                  tool === 'pen' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Ink Pen
              </button>

              <button 
                onClick={() => setTool('eraser')}
                className={`p-3 rounded-lg text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all duration-300 ${
                  tool === 'eraser' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eraser className="w-4 h-4" />
                Eraser
              </button>

              <button 
                onClick={() => setTool('text')}
                className={`p-3 rounded-lg text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all duration-300 ${
                  tool === 'text' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Type className="w-4 h-4" />
                Add Text
              </button>
            </div>
          </div>

          {/* Color & Ink Feathering Panel */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-amber-900/15 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-300 font-semibold">Brush & Color System</h3>
            
            {/* Color Picker */}
            <div className="space-y-1.5">
              <label className="label">Ink Color</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs text-neutral-400 font-mono uppercase">{color}</span>
              </div>
            </div>

            {/* Brush Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="label m-0">Pen Nib Size</label>
                <span className="text-amber-500 font-mono">{brushSize}px</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={brushSize} 
                onChange={(e) => setBrushSize(e.target.value)} 
                className="w-full accent-amber-500"
              />
            </div>

            {/* Bleeding / Shadow Blur (feathering simulation) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="label m-0">Ink Feathering (Bleed)</label>
                <span className="text-amber-500 font-mono">{shadowBlur}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="15" 
                value={shadowBlur} 
                onChange={(e) => setShadowBlur(e.target.value)} 
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Paper Textures Select */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-amber-900/15 space-y-3">
            <label className="label">Background Paper Texture</label>
            <div className="grid grid-cols-2 gap-2">
              {textures.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTexture(t.id)}
                  className={`p-2.5 rounded-lg text-xs font-medium border transition-all duration-300 text-center ${
                    paperTexture === t.id ? 'border-amber-500 text-amber-400' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                  style={{ backgroundColor: t.bg }}
                >
                  <span className={t.id === 'black' ? 'text-neutral-200' : 'text-neutral-800'}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Middle Columns - Digital Canva Draw Area */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Slant and Grid Overlays Toggles */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-amber-900/15">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setGridVisible(!gridVisible)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  gridVisible ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Grid lines
              </button>

              <button 
                onClick={() => setSlantGuide(!slantGuide)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  slantGuide ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                55° Slant Lines
              </button>
            </div>

            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Canvas size: 750 x 520
            </div>
          </div>

          {/* Actual Canvas wrapper */}
          <div className="relative border border-amber-900/30 rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
            
            {/* Grid overlay */}
            {gridVisible && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)',
                  backgroundSize: '24px 24px'
                }}
              />
            )}

            {/* Calligraphy Slant Guidelines overlay */}
            {slantGuide && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 35px, #C9A96E 36px, #C9A96E 38px)',
                  backgroundSize: '100% 100%'
                }}
              />
            )}

            <canvas id="drawing-canvas" ref={canvasRef} className="max-w-full" />
          </div>
        </div>

        {/* Right Side Tools - Text Layer Customizer */}
        <div className="lg:col-span-1 space-y-6">
          
          {tool === 'text' ? (
            <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/20 space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-amber-400">
                <Type className="w-4 h-4 animate-bounce" />
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">Typography Layer</h3>
              </div>

              {/* Text Input */}
              <div className="space-y-1">
                <label className="label">Custom Text</label>
                <input 
                  type="text" 
                  value={textVal} 
                  onChange={(e) => setTextVal(e.target.value)} 
                  placeholder="Enter calligraphy text"
                  className="input"
                />
              </div>

              {/* Font Selector */}
              <div className="space-y-1.5">
                <label className="label">Calligraphy Font Style</label>
                <div className="grid grid-cols-1 gap-2">
                  {fonts.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFont(f)}
                      className={`p-2.5 rounded-lg text-left text-xs border transition-all duration-300 ${
                        activeFont === f ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                      style={{ fontFamily: f }}
                    >
                      {f} Style Preview
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={addText}
                className="w-full btn btn-primary btn-sm flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Place on Canvas
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/20 space-y-5">
              <div className="flex items-center gap-2 text-neutral-300">
                <Layers className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">Decorative Shapes</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Add vector shape outlines to create stunning monograms, borders, or logo layouts on your canvas.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => addShape('square')}
                  className="p-3 rounded-lg border border-neutral-800 text-xs font-semibold flex flex-col items-center gap-1.5 text-neutral-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
                >
                  <Square className="w-4 h-4" />
                  Border Square
                </button>
                <button 
                  onClick={() => addShape('circle')}
                  className="p-3 rounded-lg border border-neutral-800 text-xs font-semibold flex flex-col items-center gap-1.5 text-neutral-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
                >
                  <CircleIcon className="w-4 h-4" />
                  Border Circle
                </button>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-amber-950/20 space-y-2.5">
                <p className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-medium">Quick Tip</p>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  To edit/rotate added shape outlines or text layers, activate the <b>Select / Move</b> tool, select the object and drag its corners.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
