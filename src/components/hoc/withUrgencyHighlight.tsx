import React from 'react';
import type { Assignment } from '../../types/assignment';
import { isAssignmentOverdue } from '../../utils/typeGuards';

export interface WithUrgencyProps {
  assignment: Assignment;
}

export function withUrgencyHighlight<P extends WithUrgencyProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const ComponentWithUrgency: React.FC<P> = (props) => {
    const isOverdue = isAssignmentOverdue(props.assignment);
    const isUrgent = isOverdue && !props.assignment.completed;

    return (
      <div
        className={`urgency-wrapper ${isUrgent ? 'urgent-glow' : ''}`}
        style={{
          height: '100%',
          position: 'relative',
          borderRadius: '10px',
          ...(isUrgent
            ? {
                boxShadow: '0 0 12px rgba(255, 77, 79, 0.25)',
              }
            : {}),
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithUrgency.displayName = `withUrgencyHighlight(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithUrgency;
}
