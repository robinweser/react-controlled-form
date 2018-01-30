/* @flow */
export default function mapStateToProps({ form }: Object, { formId }: Object) {
  return {
    data: form[formId].data,
  }
}
