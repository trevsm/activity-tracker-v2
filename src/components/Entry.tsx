import {Entry, isActivity, isEmotion} from '../stores/useEntries';
import styled from 'styled-components';
import {AppProps} from '../types';

const Li = styled.li<{color?: string}>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
`;

interface BaseEntryProps extends AppProps {
  timestamp: Date;
  color?: string;
}

const BaseEntry = ({children, timestamp, color, style}: BaseEntryProps) => {
  const time = new Date(timestamp);

  return (
    <Li color={color} style={style}>
      {children} : <span>{time.toLocaleDateString()}</span>
    </Li>
  );
};

export const EntryElement = ({entry}: {entry: Entry}) => {
  if (isActivity(entry)) {
    return (
      <BaseEntry
        timestamp={entry.timestamp}
        color={entry.additionalData?.color}
      >
        <span>{entry.name}</span>
      </BaseEntry>
    );
  }
  if (isEmotion(entry)) {
    return (
      <BaseEntry timestamp={entry.timestamp}>
        <span>{entry.overall}</span>
      </BaseEntry>
    );
  }
  return <li>Unknown</li>;
};
