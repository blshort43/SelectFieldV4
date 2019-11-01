/* eslint-disable indent */
/**
 *
 * SelectField
 *
 */
// NOTE Use 'required' on SelectField and <option value="" hidden/> to display a faded default value
// NOTE Example:

// handleChange = e => {
//   e.preventDefault();
//   const { name, value } = e.target;
//   this.setState({ [name]: value });
// };

// <SelectField
//  required
//  label="PTO Type"
//  name="ptoType"
//  value={ptoType || ''}
//  border={this.state.typeBorder}
// onChange={this.handleChange}
//  >
//  <option value="" hidden />
//  {data.map(type => (
//    <option key={type.PTOID} value={type.PTOID}>
//     {type.NameX}
//    </option>
//  ))}
// </SelectField>;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'versa-ui';
import { CardStyle, InputStyle, LegendStyle } from '../Views';

const StyledCard = styled(Card)`
  ${CardStyle};
`;
const StyledSelectField = styled.select`
  ${InputStyle} :invalid {
    color: gray;
  }
  ::placeholder {
    color: ${props => (props.color ? props.color : '#000000')};
  }
  :hover {
    ::-webkit-datetime-edit {
      opacity: 1;
    }
    color: ${props =>
      props.colorHover ? props.colorHover : props.color || '#000000'};
  }
`;
const StyledLegend = styled.legend`
  ${LegendStyle};
`;

class SelectField extends React.PureComponent {
  state = {
    focused: false,
    showPlaceholder: true,
  };

  handleFocus = () => {
    this.setState({ focused: true, showPlaceholder: false });
  };

  handleBlur = () => {
    if (this.props.value) {
      this.setState({ showPlaceholder: true });
    } else {
      this.setState({ focused: false, showPlaceholder: true });
    }
  };

  render() {
    const {
      type,
      name,
      value,
      label,
      labelColor,
      error,
      errorText,
      placeholder,
      required,
      children,
      onChange,
      ...props
    } = this.props;

    return (
      <StyledCard
        {...props}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <StyledLegend
          labelColor={labelColor}
          style={{
            opacity: `${this.state.focused || this.props.value ? 1 : 0}`,
            transform: `${
              this.state.focused || this.props.value
                ? 'translate(0, 0)'
                : 'translate(10px, 18px)'
            }`,
          }}
        >
          {label}
        </StyledLegend>
        <StyledSelectField
          // ref="yearSelect"
          readOnly={!this.props.onChange}
          onChange={onChange}
          error={error}
          required={required}
          placeholder={placeholder || ''}
          value={value || ''}
          type={type || 'text'}
          name={name}
        >
          {this.state.showPlaceholder && <option value="">{label}</option>}
          {children}
        </StyledSelectField>
      </StyledCard>
    );
  }
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SelectField;
