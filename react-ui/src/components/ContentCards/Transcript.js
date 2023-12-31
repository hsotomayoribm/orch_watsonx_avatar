/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import styles from './Transcript.module.scss'
import PropTypes from 'prop-types'

const Transcript = ({ className, transcript }) => {
  if (transcript.length === 0) return <div className='div'></div>

  const transcriptDisplay = transcript.map(({ source, text, card, timestamp }) => {
    // we don't want to wrap cards in a bubble, return as is w/ a key added
    // if (card) {
    //   return <ContentCardSwitch card={card} index={null} key={timestamp} inTranscript />
    // }
    return (
      <div
        key={timestamp}
        className={`transcript-entry ${source === 'user' ? 'transcript-entry-user' : ''}`}
      >
        <div className='transcript-entry-content'>{text || null}</div>
      </div>
    )
  })

  // scroll to bottom of transcript whenever it updates
  let scrollRef
  const [isMounting, setIsMounting] = useState(true)
  useEffect(() => {
    scrollRef.scrollIntoView({ behavior: isMounting ? 'instant' : 'smooth' })
    setIsMounting(false)
  }, [transcript])

  return (
    <div className={className}>
      <div className='transcript-list-group'>
        {transcriptDisplay.length > 0 ? transcriptDisplay : <li className='list-group-item' />}
        <div
          ref={(el) => {
            scrollRef = el
          }}
        />
      </div>
    </div>
  )
}

Transcript.propTypes = {
  className: PropTypes.string.isRequired,
  transcript: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string,
      text: PropTypes.string,
      timestamp: PropTypes.string,
    }),
  ).isRequired,
}

const StyledTranscript = styled(Transcript)`
  width: 100%;
  .transcript-list-group {
    //flex-shrink: 1;
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    position: absolute;
    top: 15%;
    left: 10%;
    max-height: 40rem;
    width: 22rem;
    display: flex;
    flex-direction: column;
    //justify-content: end;
    border: 2px solid rgba(204, 204, 204, 1);
    border-radius: 20px;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    background-color: white;
    padding: 1rem;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .transcript-entry {
    clear: both;
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  .transcript-entry-content {
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    width: fit-content;
    background: #ffffff;
    border-radius: 1.1rem;
  }

  .transcript-entry-user {
    float: right;
    flex-direction: row-reverse;
    .transcript-entry-content {
      background: #0d6efd;
      color: #ffffff;
    }
  }
`

const mapStateToProps = ({ sm }) => ({
  transcript: sm.transcript,
})

export default connect(mapStateToProps)(StyledTranscript)
