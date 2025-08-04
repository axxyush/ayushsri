// src/components/TerminalOverlay.jsx
import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { Terminal as TerminalIcon } from "lucide-react";

export default function TerminalOverlay({
  isOpen,
  onClose,
  heroName,
  onNavigate,
  onDownloadResume,
}) {
  const termRef = useRef(null);
  const fitRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // initialize once
    if (!termRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontFamily: "monospace",
        fontSize: 14,
        theme: {
          background: "#141414",
          foreground: "#00ff00",
          cursor: "#00ff00",
        },
      });
      const fit = new FitAddon();
      term.loadAddon(fit);
      term.open(containerRef.current);
      fit.fit();
      termRef.current = term;
      fitRef.current = fit;

      let promptBuffer = "";
      const commands = {
        help: "Show this help list",
        about: "Go to About section",
        projects: "Go to Projects section",
        skills: "Go to Skills section",
        contact: "Go to Contact section",
        resume: "Download my resume",
        exit: "Close the terminal",
        clear: "Clear the screen",
      };

      // write text char‑by‑char
      const typeText = (text, cb) => {
        let i = 0;
        const writer = () => {
          if (i < text.length) {
            term.write(text[i++]);
            setTimeout(writer, 20);
          } else if (cb) {
            cb();
          }
        };
        writer();
      };

      // print a prompt
      const prompt = () => {
        term.write("\x1b[36mguardian@codeguardian:~$ \x1b[0m");
      };

      // welcome animation
      term.writeln(""); // start on blank line
      typeText(
        `Guardian Terminal Initialized. Welcome, ${heroName}.\r\n`,
        () => {
          typeText("Type 'help' for a list of available commands.\r\n", () => {
            prompt();
          });
        }
      );

      term.onKey(({ key, domEvent }) => {
        const printable =
          !domEvent.altKey && !domEvent.ctrlKey && key.length === 1;

        if (domEvent.key === "Enter") {
          term.write("\r\n");
          const cmd = promptBuffer.trim().toLowerCase();
          promptBuffer = "";

          switch (cmd) {
            case "help": {
              typeText("Available commands:\r\n", () => {
                const entries = Object.entries(commands).map(
                  ([c, desc]) => `  ${c} — ${desc}\r\n`
                );
                const typeNext = (i) => {
                  if (i >= entries.length) {
                    prompt();
                  } else {
                    typeText(entries[i], () => typeNext(i + 1));
                  }
                };
                typeNext(0);
              });
              break;
            }

            case "about":
              typeText(`Navigating to '${cmd}'...\r\n`, () => {
                onNavigate(cmd);
                onClose();
              });
              setTimeout(() => {
                onNavigate(cmd);
                onClose();
              }, 1000);
              break;

            case "projects":
              typeText(`Navigating to '${cmd}'...\r\n`, () => {
                onNavigate(cmd);
                onClose();
              });
              setTimeout(() => {
                onNavigate(cmd);
                onClose();
              }, 1000);
              break;

            case "skills":
              typeText(`Navigating to '${cmd}'...\r\n`, () => {
                onNavigate(cmd);
                onClose();
              });
              setTimeout(() => {
                onNavigate(cmd);
                onClose();
              }, 1000);
              break;

            case "contact":
              typeText(`Navigating to '${cmd}'...\r\n`, () => {
                onNavigate(cmd);
                onClose();
              });
              setTimeout(() => {
                onNavigate(cmd);
                onClose();
              }, 1000);
              break;
            case "resume":
              typeText("Preparing resume download...\r\n", () => {
                onDownloadResume();
                prompt();
              });
              break;

            case "exit":
              typeText("Closing terminal...\r\n", () => {
                onClose();
              });
              break;
            case "clear":
              term.clear();
              prompt();
              break;
            case "":
              prompt();
              break;
            default:
              typeText(
                `\x1b[31mError:\x1b[0m command not found: '${cmd}'\r\n`,
                () => {
                  typeText("Type 'help' for a list of commands.\r\n", prompt);
                }
              );
          }
        } else if (domEvent.key === "Backspace") {
          if (promptBuffer.length) {
            term.write("\b \b");
            promptBuffer = promptBuffer.slice(0, -1);
          }
        } else if (domEvent.key === "ArrowUp" || domEvent.key === "ArrowDown") {
          // ignore history for simplicity or add custom logic here
        } else if (printable) {
          promptBuffer += key;
          term.write(key);
        }
      });

      // re-fit on resize
      window.addEventListener("resize", () => fit.fit());
    } else {
      // on re-open
      fitRef.current.fit();
      termRef.current.focus();
    }
  }, [isOpen, heroName, onClose, onNavigate, onDownloadResume]);

  useEffect(() => {
    if (!isOpen && termRef.current) {
      termRef.current.dispose();
      termRef.current = null;
      fitRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="d-flex flex-column bg-dark text-light rounded border"
        style={{
          width: "80%",
          height: "80%",
          borderColor:
            heroName === "Ironman"
              ? "#CC0000"
              : heroName === "Spiderman"
              ? "#E83350"
              : heroName === "Loki"
              ? "#4CAF50"
              : "#888",
          boxShadow: `0 0 20px ${
            heroName === "Ironman"
              ? "#CC0000"
              : heroName === "Spiderman"
              ? "#E83350"
              : heroName === "Loki"
              ? "#4CAF50"
              : "#888"
          }`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="d-flex align-items-center px-3 py-2 border-bottom border-secondary">
          <TerminalIcon size={20} className="me-2" color="white" />
          <div
            className="flex-grow-1 text-center"
            style={{ fontFamily: "monospace" }}
          >
            Guardian Terminal — {heroName}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          />
        </div>

        {/* xterm canvas */}
        <div
          ref={containerRef}
          style={{ flex: 1, overflow: "hidden", padding: "0.5rem" }}
        />
      </div>
    </div>
  );
}
