import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [input, setInput] = useState(options);

  const onSubmit = () => {
    onOptionsChange(input);
  };

  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <FormField
            label="Max Threshold"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="threshold"
            value={input.threshold}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput({ threshold: parseInt(e.target.value) })}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};
