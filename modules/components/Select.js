/* @flow */
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Box } from 'kilvin'

import SelectField from '../components/SelectField'
import SelectItem from '../components/SelectItem'
import Line from '../components/Line'

import Question from '../styleguide/Question'

import { updateForm, initField } from '../actions/form'

class Select extends Component {
  static contextTypes = {
    theme: PropTypes.object,
    formId: PropTypes.string.isRequired
  };

  listener: Function;
  select: Object;
  justToggled: boolean;
  props: {
    deviceWidth: number,
    initField: Function,
    updateForm: Function,
    width: number | string,
    color?: string,
    fieldId: string,
    options: Array<string>,
    defaultValue: string,
    defaultOption?: string
  };
  state: { expanded: boolean, selectedOption?: string };

  constructor(props: Object, context: Object) {
    super(props, context)

    props.initField(context.formId, props.fieldId, props.defaultOption)

    this.state = {
      expanded: false,
      selectedOption: props.defaultOption || undefined
    }
  }
  componentDidMount() {
    const selectBox = this
    this.listener = () => {
      if (selectBox.justToggled === false) {
        selectBox.setState({ expanded: false })
      }
      selectBox.justToggled = false
    }

    window.addEventListener('click', this.listener)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.listener)
  }

  toggle = () => {
    this.justToggled = true
    this.setState({ expanded: !this.state.expanded })
  };

  renderDesktop() {
    const optionItems = this.props.options
      .filter(option => option !== this.state.selectedOption)
      .map((option) => {
        const selectItem = () => {
          this.setState({
            selectedOption: option,
            expanded: false
          })
          this.props.updateForm(
            this.context.formId,
            this.props.fieldId,
            option,
            true
          )
        }
        const item = (
          <SelectItem onClick={selectItem}>
            <Question>{option}</Question>
          </SelectItem>
        )

        return item
      })

    const selectedOption = (
      <Box>
        <SelectItem onClick={this.toggle}>
          <Question>{this.state.selectedOption}</Question>
        </SelectItem>
        <Box padding="5px 12px">
          <Line size={1} color="lightgrey" width="100%" />
        </Box>
      </Box>
    )

    return (
      <Box
        style={{
          minWidth: this.props.width,
          marginTop: -5
        }}
      >
        <SelectField
          onClick={this.toggle}
          style={{
            position: 'absolute',
            width: this.props.width,
            borderColor: this.context.theme.colors.primary
          }}
        >
          <Question
            color={
              this.state.selectedOption
                ? this.context.theme.colors.primary
                : this.context.theme.colors.highlight
            }
          >
            {this.state.selectedOption === undefined
              ? ' '
              : this.state.selectedOption}
          </Question>
        </SelectField>
        <Box
          style={{
            position: 'absolute',
            zIndex: 100,
            minWidth: this.props.width,
            backgroundColor: 'white',
            color: this.context.theme.colors.primary,
            display: this.state.expanded ? 'flex' : 'none',
            borderRadius: 3,
            border: `2px solid ${this.context.theme.colors.primary}`
          }}
        >
          {this.state.selectedOption ? selectedOption : null}
          {optionItems}
        </Box>
      </Box>
    )
  }

  renderMobile() {
    const optionItems = this.props.options.map(opt => (
      <option key={opt}>{opt}</option>
    ))

    const onChange = (e) => {
      const option = e.currentTarget.value

      this.setState({ selectedOption: option })

      this.props.updateForm(
        this.context.formId,
        this.props.fieldId,
        option,
        true
      )
    }

    const onClick = () => {
      this.select.focus()
    }

    return (
      <Box grow>
        <select
          ref={(el) => {
            this.select = el
          }}
          onChange={onChange}
          style={{
            position: 'absolute',
            opacity: 0.0,
            fontSize: 16,
            width: '90%',
            height: 39
          }}
        >
          <option disabled selected />
          {optionItems}
        </select>
        <SelectField
          onClick={onClick}
          style={{
            width: '100%',
            borderColor: this.context.theme.colors.primary
          }}
        >
          <Question
            color={
              this.state.selectedOption
                ? this.context.theme.colors.primary
                : this.context.theme.colors.highlight
            }
            style={{ textAlign: 'center' }}
          >
            {this.state.selectedOption === undefined
              ? ' '
              : this.state.selectedOption}
          </Question>
        </SelectField>
      </Box>
    )
  }

  render() {
    if (this.props.deviceWidth > 1024) {
      return this.renderDesktop()
    }

    return this.renderMobile()
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  updateForm: (formId, fieldId, value, isValid) =>
    dispatch(
      updateForm({
        formId,
        fieldId,
        value,
        isValid
      })
    ),
  initField: (formId, fieldId, defaultValue) =>
    dispatch(
      initField({
        formId,
        fieldId,
        defaultValue,
        isRequired: !defaultValue
      })
    )
})

const mapStateToProps = (state: Object) => ({ formData: state.form })
export default connect(mapStateToProps, mapDispatchToProps)(Select)
