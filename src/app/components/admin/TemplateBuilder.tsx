"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical, Type, Palette, RotateCw } from "lucide-react";
import { normalizeHexColor } from "@/lib/utils/color";

type TemplateConfig = {
  templateWidth: number;
  templateHeight: number;
  textX: number;
  textY: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  textAlign: "left" | "center" | "right";
  rotation: number;
  previewUrl?: string;
};

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Impact",
  "Verdana",
  "Trebuchet MS",
  "Comic Sans MS",
  "Lucida Console",
];

const DEFAULT_CONFIG: TemplateConfig = {
  templateWidth: 1920,
  templateHeight: 1080,
  textX: 960,
  textY: 540,
  fontSize: 56,
  fontFamily: "Arial",
  fontColor: "#ffffff",
  textAlign: "center",
  rotation: 0,
};

interface TemplateBuilderProps {
  initialConfig?: Partial<TemplateConfig>;
  onConfigChange?: (config: TemplateConfig) => void;
  previewSample?: string;
}

export function TemplateBuilder({
  initialConfig,
  onConfigChange,
  previewSample = "Juan dela Cruz",
}: TemplateBuilderProps) {
  const configRef = useRef<TemplateConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  });
  const [config, setConfig] = useState<TemplateConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({
    width: 600,
    height: 338,
  });

  useEffect(() => {
    if (initialConfig) {
      setConfig((prev) => ({ ...prev, ...initialConfig }));
    }
  }, [initialConfig]);

  const scale = Math.min(
    containerSize.width / (config.templateWidth || 1920),
    containerSize.height / (config.templateHeight || 1080),
  );

  const actualWidth = (config.templateWidth || 1920) * scale;
  const actualHeight = (config.templateHeight || 1080) * scale;

  const positionToPercent = useCallback(
    (pixelValue: number, dimension: number) => {
      return dimension > 0 ? (pixelValue / dimension) * 100 : 50;
    },
    [],
  );

  const percentToPosition = useCallback(
    (percent: number, dimension: number) => {
      return Math.round((percent / 100) * dimension);
    },
    [],
  );

  const handleConfigChange = useCallback(
    (updates: Partial<TemplateConfig>) => {
      const processedUpdates: Partial<TemplateConfig> = {};

      if (updates.fontColor !== undefined) {
        const normalized = normalizeHexColor(updates.fontColor);
        if (normalized !== config.fontColor) {
          processedUpdates.fontColor = normalized;
        }
      }

      let hasChanges = Object.keys(processedUpdates).length > 0;

      for (const [key, value] of Object.entries(updates)) {
        if (key === "fontColor") continue;
        if ((config as any)[key] !== value) {
          (processedUpdates as any)[key] = value;
          hasChanges = true;
        }
      }

      if (!hasChanges) return;

      const newConfig = { ...config, ...processedUpdates };
      setConfig(newConfig);
      configRef.current = newConfig;
      onConfigChange?.(newConfig);
    },
    [config, onConfigChange],
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = (e.clientX - dragStart.x) / scale;
      const deltaY = (e.clientY - dragStart.y) / scale;

      const newX = Math.max(
        0,
        Math.min(config.templateWidth, config.textX + deltaX),
      );
      const newY = Math.max(
        0,
        Math.min(config.templateHeight, config.textY + deltaY),
      );

      setDragStart({ x: e.clientX, y: e.clientY });

      handleConfigChange({
        textX: Math.round(newX),
        textY: Math.round(newY),
      });
    },
    [isDragging, dragStart, scale, config, handleConfigChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const scaleX = config.templateWidth / rect.width;
        const scaleY = config.templateHeight / rect.height;

        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        const newX = Math.max(0, Math.min(config.templateWidth, mouseX));
        const newY = Math.max(0, Math.min(config.templateHeight, mouseY));

        setConfig((prev) => ({
          ...prev,
          textX: Math.round(newX),
          textY: Math.round(newY),
        }));
      };

      const handleGlobalUp = () => {
        setIsDragging(false);
        onConfigChange?.(configRef.current);
      };

      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMove);
        window.removeEventListener("mouseup", handleGlobalUp);
      };
    }
  }, [isDragging, config.templateWidth, config.templateHeight, onConfigChange]);

  const textAnchor =
    config.textAlign === "left"
      ? "start"
      : config.textAlign === "right"
        ? "end"
        : "middle";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg border border-brick-red-600 bg-brick-red-900/50 p-2 overflow-hidden">
            <div
              ref={containerRef}
              className="relative mx-auto"
              style={{
                width: actualWidth,
                height: actualHeight,
                cursor: isDragging ? "grabbing" : "grab",
                backgroundImage: config.previewUrl
                  ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${config.previewUrl})`
                  : "none",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  left: config.textX * scale,
                  top: config.textY * scale,
                  transform: `translate(-${config.textAlign === "left" ? "0" : config.textAlign === "right" ? "100%" : "50%"}, -50%) rotate(${-config.rotation}deg)`,
                  transformOrigin: "center center",
                  fontFamily: config.fontFamily,
                  fontSize: config.fontSize * scale,
                  color: config.fontColor,
                  textAlign: config.textAlign,
                  whiteSpace: "nowrap",
                }}
              >
                <span className="drop-shadow-lg">{previewSample}</span>
              </div>

              <div
                className="absolute"
                style={{
                  left: config.textX * scale,
                  top: config.textY * scale,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  border: "2px solid #ef4444",
                  transform: "translate(-50%, -50%)",
                  cursor: "grab",
                  zIndex: 10,
                }}
                onMouseDown={handleMouseDown}
              >
                <GripVertical className="absolute -left-1 -top-1 h-2 w-2 text-red-500" />
              </div>
            </div>

            <p className="text-xs text-white/50 mt-2 text-center">
              Drag the red marker to position text • Template:{" "}
              {config.templateWidth}×{config.templateHeight}px
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/90 mb-1">
              Preview Text
            </label>
            <input
              type="text"
              value={previewSample}
              onChange={(e) =>
                previewSample !== e.target.value ? previewSample : undefined
              }
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              placeholder="Enter sample name"
            />
          </div>

          <div>
            <label className="block text-sm text-white/90 mb-1">
              <Type className="inline h-4 w-4 mr-1" />
              Font Family
            </label>
            <select
              value={config.fontFamily}
              onChange={(e) =>
                handleConfigChange({ fontFamily: e.target.value })
              }
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-white/90 mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={config.fontSize}
                onChange={(e) =>
                  handleConfigChange({
                    fontSize: Math.max(
                      10,
                      Math.min(200, Number(e.target.value)),
                    ),
                  })
                }
                min={10}
                max={200}
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              />
              <input
                type="range"
                value={config.fontSize}
                onChange={(e) =>
                  handleConfigChange({ fontSize: Number(e.target.value) })
                }
                min={10}
                max={200}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-white/90 mb-1">
                <RotateCw className="inline h-4 w-4 mr-1" />
                Rotation
              </label>
              <input
                type="number"
                value={config.rotation}
                onChange={(e) =>
                  handleConfigChange({
                    rotation: Math.max(
                      -180,
                      Math.min(180, Number(e.target.value)),
                    ),
                  })
                }
                min={-180}
                max={180}
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              />
              <input
                type="range"
                value={config.rotation}
                onChange={(e) =>
                  handleConfigChange({ rotation: Number(e.target.value) })
                }
                min={-180}
                max={180}
                className="w-full mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/90 mb-1">
              <Palette className="inline h-4 w-4 mr-1" />
              Font Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.fontColor}
                onChange={(e) =>
                  handleConfigChange({ fontColor: e.target.value })
                }
                className="h-10 w-10 rounded border border-brick-red-500 cursor-pointer"
              />
              <input
                type="text"
                value={config.fontColor}
                onChange={(e) =>
                  handleConfigChange({ fontColor: e.target.value })
                }
                className="flex-1 rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white font-mono text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/90 mb-1">
              Text Align
            </label>
            <div className="flex gap-1">
              {(["left", "center", "right"] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => handleConfigChange({ textAlign: align })}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium capitalize ${
                    config.textAlign === align
                      ? "border-white bg-white text-brick-red-700"
                      : "border-brick-red-500 text-white hover:bg-brick-red-800"
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-white/90 mb-1">
                Position X
              </label>
              <input
                type="number"
                value={config.textX}
                onChange={(e) =>
                  handleConfigChange({
                    textX: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/90 mb-1">
                Position Y
              </label>
              <input
                type="number"
                value={config.textY}
                onChange={(e) =>
                  handleConfigChange({
                    textY: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateBuilder;
