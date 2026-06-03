import React, { useEffect, useRef } from 'react'
import { useChat } from './hooks/useChat'
import MessageBubble from './components/MessageBubble'
import TypingIndicator from './components/TypingIndicator'
import ChatInput from './components/ChatInput'

const globalCSS = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`

export default function App() {
  const { messages, isLoading, error, tokenCount, send, clear } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isEmpty = messages.length === 0

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              fontStyle: 'italic',
            }}>
              ai chat
            </h1>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}>
              claude sonnet 4
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {tokenCount.input > 0 && (
              <span style={{
                fontSize: '10px',
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
              }}>
                ↑{tokenCount.input} ↓{tokenCount.output} tokens
              </span>
            )}
            {!isEmpty && (
              <button
                onClick={clear}
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  background: 'transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = 'var(--error)'
                  e.target.style.color = 'var(--error)'
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.color = 'var(--text-muted)'
                }}
              >
                clear
              </button>
            )}
            <div style={{
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulse 2.5s ease-in-out infinite',
            }} />
          </div>
        </header>

        {/* Messages */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 24px 0',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {isEmpty ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 0',
              animation: 'fadeUp 0.4s ease',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '38px',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}>
                What's on<br/>your mind?
              </div>
              <p style={{
                color: 'var(--text-dim)',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                ask anything · powered by claude
              </p>
            </div>
          ) : (
            <div style={{ maxWidth: '780px', width: '100%', margin: '0 auto', flex: 1 }}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              {error && (
                <div style={{
                  margin: '0 0 16px',
                  padding: '10px 14px',
                  background: 'rgba(192, 97, 74, 0.08)',
                  border: '1px solid rgba(192, 97, 74, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--error)',
                  fontSize: '12.5px',
                  animation: 'fadeUp 0.2s ease',
                }}>
                  ⚠ {error}
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </main>

        {/* Input */}
        <footer style={{
          padding: '16px 24px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          flexShrink: 0,
        }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <ChatInput onSend={send} isLoading={isLoading} isEmpty={isEmpty} />
          </div>
        </footer>
      </div>
    </>
  )
}
