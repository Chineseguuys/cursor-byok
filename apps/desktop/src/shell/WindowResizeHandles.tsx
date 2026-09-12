import { getCurrentWindow } from "@tauri-apps/api/window";
import styles from "./WindowResizeHandles.module.scss";

// `ResizeDirection` is not exported by @tauri-apps/api/window, so redeclare the
// same string union locally. The method signature accepts this shape.
type ResizeDirection =
  | "North"
  | "South"
  | "East"
  | "West"
  | "NorthWest"
  | "NorthEast"
  | "SouthWest"
  | "SouthEast";

// Edges first, corners last: DOM order makes corners win the overlap.
const DIRECTIONS: ReadonlyArray<readonly [ResizeDirection, string]> = [
  ["North", styles.north],
  ["South", styles.south],
  ["West", styles.west],
  ["East", styles.east],
  ["NorthWest", styles.northWest],
  ["NorthEast", styles.northEast],
  ["SouthWest", styles.southWest],
  ["SouthEast", styles.southEast],
];

export function WindowResizeHandles() {
  const appWindow = getCurrentWindow();

  return <>
    {DIRECTIONS.map(([direction, className]) => (
      <div
        key={direction}
        className={[styles.handle, className].join(" ")}
        aria-hidden="true"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          void appWindow.startResizeDragging(direction).catch(() => {
            // Some window managers reject client-initiated resizing; ignore.
          });
        }}
      />
    ))}
  </>;
}
