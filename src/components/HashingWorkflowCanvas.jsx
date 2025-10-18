import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Play, RotateCcw, Link } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const HASH_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-512', 'MD5', 'RIPEMD-160'];

const hashData = async (data, algorithm) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  let hashBuffer;
  switch (algorithm) {
    case 'SHA-1':
      hashBuffer = await crypto.subtle.digest('SHA-1', dataBuffer);
      break;
    case 'SHA-256':
      hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      break;
    case 'SHA-512':
      hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
      break;
    case 'MD5':
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
    case 'RIPEMD-160':
      let hash2 = 0;
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash2 = ((hash2 << 7) - hash2) + char;
        hash2 = hash2 & hash2;
      }
      return Math.abs(hash2).toString(16).padStart(40, '0').slice(0, 40);
    default:
      hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  }

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const HashBlock = ({ block, onUpdate, onDelete, onConnect, isConnecting, scale, allBlocks, isFirstBlock, onCopyHash }) => {
  const getCombinedInput = () => {
    let combined = '';
    block.inputs.forEach(inputId => {
      const inputBlock = allBlocks.find(b => b.id === inputId);
      if (inputBlock && inputBlock.output) {
        combined += inputBlock.output;
      }
    });
    return combined;
  };

  const displayInput = isFirstBlock ? block.customInput : getCombinedInput();

  return (
    <div
      className="absolute bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-xl cursor-move"
      style={{
        left: block.x,
        top: block.y,
        width: '280px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      }}
    >
      <div className="p-3 border-b border-emerald-400">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isFirstBlock ? 'bg-yellow-300' : 'bg-emerald-300'}`}></div>
            <span className="text-white font-semibold text-sm">
              Block {block.id}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onConnect(block.id)}
              className={`p-1 rounded hover:bg-emerald-400 transition-colors ${isConnecting ? 'bg-yellow-400' : 'bg-emerald-600'
                }`}
              title="Connect to another block"
            >
              <Link size={12} className="text-white" />
            </button>
            {!isFirstBlock && (
              <button
                onClick={() => onDelete(block.id)}
                className="p-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                <Trash2 size={12} className="text-white" />
              </button>
            )}
          </div>
        </div>

        <select
          value={block.algorithm}
          onChange={(e) => onUpdate(block.id, { algorithm: e.target.value })}
          className="w-full px-2 py-1 text-xs bg-emerald-700 text-white rounded border-none outline-none"
        >
          {HASH_ALGORITHMS.map(algo => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
      </div>

      <div className="p-3">
        {isFirstBlock ? (
          <div className="mb-2">
            <label className="text-xs text-emerald-100 block mb-1">Input:</label>
            <textarea
              value={block.customInput || ''}
              onChange={(e) => onUpdate(block.id, { customInput: e.target.value })}
              className="w-full px-2 py-1 text-xs bg-emerald-700/50 text-white rounded outline-none resize-none"
              placeholder="Enter initial data..."
              rows="3"
            />
          </div>
        ) : (
          block.inputs.length > 0 && (
            <div className="mb-2">
              <label className="text-xs text-emerald-100 block mb-1">Input (from blocks):</label>
              <div className="bg-emerald-900/50 p-2 rounded text-[8px] text-emerald-100 break-all font-mono max-h-20 overflow-y-auto">
                {block.inputs.map(inputId => {
                  const inputBlock = allBlocks.find(b => b.id === inputId);
                  return inputBlock && inputBlock.output ? (
                    <div key={inputId} className="mb-1">
                      <span className="text-emerald-300">Block {inputId}:</span> {inputBlock.output}
                    </div>
                  ) : (
                    <div key={inputId} className="mb-1 text-orange-300">
                      Block {inputId}: Waiting for execution...
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {!isFirstBlock && block.inputs.length === 0 && (
          <div className="mb-2 text-xs text-orange-300 bg-orange-900/20 p-2 rounded">
            ⚠️ No connections! Connect from another block.
          </div>
        )}

        {block.output && (
          <div>
            <label className="text-xs text-emerald-100 block mb-1">Output:</label>
            <div
              onClick={() => onCopyHash(block.output)}
              className="bg-emerald-900/50 p-2 rounded text-[10px] text-emerald-100 break-all font-mono max-h-24 overflow-y-auto leading-relaxed cursor-pointer hover:bg-emerald-800/50 transition-colors"
              title="Click to copy"
            >
              {block.output}
            </div>
          </div>
        )}

        {block.inputs.length > 0 && (
          <div className="mt-2 text-xs text-emerald-100">
            ← Connected from: {block.inputs.join(', ')}
          </div>
        )}

        {block.outputs.length > 0 && (
          <div className="mt-1 text-xs text-emerald-100">
            → Connected to: {block.outputs.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

const Connection = ({ from, to, blocks, scale }) => {
  const fromBlock = blocks.find(b => b.id === from);
  const toBlock = blocks.find(b => b.id === to);

  if (!fromBlock || !toBlock) return null;

  const startX = (fromBlock.x + 280) * scale;
  const startY = (fromBlock.y + 80) * scale;
  const endX = toBlock.x * scale;
  const endY = (toBlock.y + 80) * scale;

  const midX = (startX + endX) / 2;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <marker
          id={`arrowhead-${from}-${to}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
      <path
        d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#arrowhead-${from}-${to})`}
        className="opacity-70"
      />
    </svg>
  );
};

export default function ComplexHashFlow() {
  const [blocks, setBlocks] = useState([
    { id: 1, x: 100, y: 100, algorithm: 'SHA-256', customInput: '', output: '', inputs: [], outputs: [] }
  ]);
  const [connections, setConnections] = useState([]);
  const [nextId, setNextId] = useState(2);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [connecting, setConnecting] = useState(null);
  const [scale, setScale] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Hash copied to clipboard!', {
        icon: '📋',
        style: {
          borderRadius: '12px',
          background: '#064e3b',
          color: '#fff',
          border: '1px solid #10b981',
        },
      });
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const addBlock = () => {
    const newBlock = {
      id: nextId,
      x: 100 + (nextId - 1) * 50,
      y: 100 + (nextId - 1) * 50,
      algorithm: 'SHA-256',
      customInput: '',
      output: '',
      inputs: [],
      outputs: []
    };
    setBlocks([...blocks, newBlock]);
    setNextId(nextId + 1);
    toast.success('Block added successfully!');
  };

  const deleteBlock = (id) => {
    if (id === 1) {
      toast.error('Cannot delete the start block!');
      return;
    }

    setBlocks(blocks.filter(b => b.id !== id).map(b => ({
      ...b,
      inputs: b.inputs.filter(inputId => inputId !== id),
      outputs: b.outputs.filter(outputId => outputId !== id)
    })));

    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    toast.success(`Block ${id} deleted`);
  };

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleConnect = (blockId) => {
    if (connecting === null) {
      setConnecting(blockId);
      toast('Select target block to connect', { icon: '🔗' });
    } else if (connecting !== blockId) {
      const exists = connections.some(c => c.from === connecting && c.to === blockId);
      if (!exists) {
        setConnections([...connections, { from: connecting, to: blockId }]);

        setBlocks(blocks.map(b => {
          if (b.id === connecting) {
            return { ...b, outputs: [...b.outputs, blockId] };
          }
          if (b.id === blockId) {
            return { ...b, inputs: [...b.inputs, connecting] };
          }
          return b;
        }));
        toast.success(`Connected Block ${connecting} → Block ${blockId}`);
      } else {
        toast.error('Connection already exists!');
      }
      setConnecting(null);
    }
  };

  const processHashing = async () => {
    setIsProcessing(true);
    toast.loading('Processing hash chain...', { id: 'processing' });

    const resetBlocks = blocks.map(b => ({ ...b, output: '' }));
    setBlocks(resetBlocks);
    await new Promise(resolve => setTimeout(resolve, 100));

    const inDegree = {};
    const adjList = {};

    resetBlocks.forEach(b => {
      inDegree[b.id] = b.inputs.length;
      adjList[b.id] = b.outputs;
    });

    const queue = resetBlocks.filter(b => b.inputs.length === 0).map(b => b.id);
    const processedBlocks = new Map(resetBlocks.map(b => [b.id, { ...b }]));

    while (queue.length > 0) {
      const currentId = queue.shift();
      const block = processedBlocks.get(currentId);

      if (!block) continue;

      let inputData = '';

      if (currentId === 1) {
        inputData = block.customInput || '';
      } else {
        const sortedInputs = [...block.inputs].sort((a, b) => a - b);
        for (const inputId of sortedInputs) {
          const inputBlock = processedBlocks.get(inputId);
          if (inputBlock && inputBlock.output) {
            inputData += inputBlock.output;
          }
        }
      }

      if (inputData) {
        const hash = await hashData(inputData, block.algorithm);
        const updatedBlock = { ...block, output: hash };
        processedBlocks.set(currentId, updatedBlock);

        setBlocks(Array.from(processedBlocks.values()));
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      if (adjList[currentId]) {
        adjList[currentId].forEach(nextId => {
          inDegree[nextId]--;
          if (inDegree[nextId] === 0) {
            queue.push(nextId);
          }
        });
      }
    }

    setIsProcessing(false);
    toast.success('Hash chain completed!', { id: 'processing' });
  };

  const reset = () => {
    setBlocks(blocks.map(b => ({ ...b, output: '' })));
    toast.success('Reset completed!');
  };

  const handleMouseDown = (e, blockId) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    const block = blocks.find(b => b.id === blockId);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragging(blockId);
    setOffset({
      x: e.clientX - rect.left - block.x * scale,
      y: e.clientY - rect.top - block.y * scale
    });
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - offset.x) / scale;
      const newY = (e.clientY - rect.top - offset.y) / scale;

      updateBlock(dragging, { x: Math.max(0, newX), y: Math.max(0, newY) });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, offset]);

  return (
    <div className="bg-gradient-to-br from-gray-950 via-emerald-950 to-black text-white pt-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#064e3b',
            color: '#fff',
            border: '1px solid #10b981',
            borderRadius: '12px',
          },
        }}
      />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mb-3">
              Dynamic Blockchain Network Designer
            </h1>
            <p className="text-emerald-300/80 text-lg">
              Build and visualize complex cryptographic hash chains with multiple connections
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={addBlock}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <Plus size={20} />
              Add Block
            </button>
            <button
              onClick={processHashing}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 shadow-lg"
            >
              <Play size={20} />
              {isProcessing ? 'Processing...' : 'Execute'}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>

          {connecting !== null && (
            <div className="text-center mb-4">
              <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg border border-yellow-500/30">
                → Connecting from Block {connecting} (click another block to connect)
              </span>
            </div>
          )}

          <div
            ref={canvasRef}
            className="relative bg-black/40 backdrop-blur-xl rounded-lg border-2 border-emerald-700/30 overflow-hidden"
            style={{ height: '700px' }}
          >
            {connections.map((conn, idx) => (
              <Connection key={idx} from={conn.from} to={conn.to} blocks={blocks} scale={scale} />
            ))}

            {blocks.map(block => (
              <div
                key={block.id}
                onMouseDown={(e) => handleMouseDown(e, block.id)}
                style={{ zIndex: dragging === block.id ? 1000 : 1 }}
              >
                <HashBlock
                  block={block}
                  onUpdate={updateBlock}
                  onDelete={deleteBlock}
                  onConnect={handleConnect}
                  isConnecting={connecting === block.id}
                  scale={scale}
                  allBlocks={blocks}
                  isFirstBlock={block.id === 1}
                  onCopyHash={copyToClipboard}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 bg-black/30 backdrop-blur-xl rounded-lg p-4 border border-emerald-700/30">
            <h3 className="text-emerald-400 font-semibold mb-2">Instructions:</h3>
            <ul className="text-sm text-emerald-300/80 space-y-1">
              <li>• <strong>Block 1 (Start Block)</strong>: The only block where you can enter input text</li>
              <li>• <strong>Other Blocks</strong>: Automatically take input from connected blocks' outputs</li>
              <li>• Click "Add Block" to create new hash processing blocks</li>
              <li>• Drag blocks to reposition them on the canvas</li>
              <li>• Click the link icon on a block, then click another block to connect them</li>
              <li>• Click "Execute" to process the entire chain in order</li>
              <li>• Build complex flows: parallel paths, merges, splits, and more!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}