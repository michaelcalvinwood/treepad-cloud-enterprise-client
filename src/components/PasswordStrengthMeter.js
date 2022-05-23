import React, { Component } from 'react';
import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = props => {

  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Better';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }

    const { password } = props;
    const testedResult = zxcvbn(password);
    return (
      <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${createPasswordLabel(testedResult)}`}
          value={testedResult.score}
          max="4"
        />
        <br />
        <label
          className="password-strength-meter-label"
        >
          
            <>
              <strong>Password strength:</strong> {createPasswordLabel(testedResult)}
            </>
        </label>
      </div>
    );
}


export default PasswordStrengthMeter;