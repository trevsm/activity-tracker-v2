import {
  Activity,
  Emotion,
  Entry,
  isActivity,
  isEmotion,
} from '../stores/useEntries';
import styled from 'styled-components';
import {AppProps} from '../types';

export const Li = styled.li<{color?: string}>`
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
      {children} <span>timestamp: {time.toLocaleDateString()}</span>
    </Li>
  );
};

const ActivityEntry = ({entry}: {entry: Activity}) => {
  return (
    <div>
      <BaseEntry
        timestamp={entry.timestamp}
        color={entry.additionalData?.color}
      >
        <span>activity: {entry.name}</span>
        {entry.additionalData && (
          <ul>
            {Object.keys(entry.additionalData).map((value, key) => {
              if (!entry.additionalData) return null;

              const entryValue = entry.additionalData[value];
              if (!entryValue) return null;

              return (
                <li key={key}>
                  {value} : {entryValue}
                </li>
              );
            })}
          </ul>
        )}
      </BaseEntry>
    </div>
  );
};

const EmotionEntry = ({entry}: {entry: Emotion}) => {
  return (
    <BaseEntry timestamp={entry.timestamp}>
      <p>Overall: {entry.overall}</p>
      <p>Description: {entry.description}</p>
    </BaseEntry>
  );
};

export const EntryElement = ({entry}: {entry: Entry}) => {
  if (isActivity(entry)) {
    return <ActivityEntry entry={entry} />;
  }
  if (isEmotion(entry)) {
    return <EmotionEntry entry={entry} />;
  }
  return <li>Unknown</li>;
};
