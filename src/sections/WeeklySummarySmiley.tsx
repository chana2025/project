import React from 'react';

interface Props {
  result: 'good' | 'bad';
}

export const WeeklySummarySmiley: React.FC<Props> = ({ result }) => {
  return (
    <div>
      {result === 'good' ? '😊 כל הכבוד!' : '😕 נסי לשפר שבוע הבא!'}
    </div>
  );
};
