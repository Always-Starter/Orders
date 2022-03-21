import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

const customToggle =  React.forwardRef(({ onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
  </a>
));

function MessageOperationBar({ isFromMe }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={customToggle} split="true" id="dropdown-custom-components" autoClose />
      <Dropdown.Menu >
        <Dropdown.Item eventKey="recall" onClick={
          (e) => {
            console.log('Hi, message get recalled', e);
          }
        }>撤回</Dropdown.Item>
          {isFromMe && (<Dropdown.Item eventKey="delte">删除</Dropdown.Item>)}
        </Dropdown.Menu>
    </Dropdown>
  );
}

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }
  
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div className="d-flex flex-row">
                  {message.fromMe && <MessageOperationBar isFromMe={message.fromMe} />}
                    <div
                      className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                      {message.text}
                    </div>
                  {!message.fromMe && <MessageOperationBar isFromMe={message.fromMe} />}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
              <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
