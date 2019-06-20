const asyncData = async (url, parseFormat = 'json') => {
  try {
    const resp = await fetch(url)
    return await resp[parseFormat]()
  } catch (e) {
    return "Request Failed"
  }
}

const Fetch = async (url, parseFormat) => await asyncData(url, parseFormat)


// class Fetch extends PureComponent {
//   state = {
//     data: void 0,
//     err: void 0,
//     loading: true
//   }
//
//   async componentDidMount() {
//     await this.asyncData(this.props.url, this.props.parseFormat)
//   }
//
//   asyncData = async (url, parseFormat = 'json') => {
//     try {
//       const resp = await fetch(url)
//       const data = await resp[parseFormat]()
//       this.setState({
//         loading: false,
//         data
//       })
//     } catch (e) {
//       this.setState({
//         err: e
//       })
//     } finally {
//       let check = setInterval(() => {
//         if (!this.state.data && !this.state.err && this.state.loading) {
//           this.componentDidMount()
//         } else {
//           clearInterval(check)
//         }
//       }, 6000)
//     }
//   }
//
//   render() {
//     const { success, loading, error } = this.props;
//     const { data, err } = this.state
//
//     if (this.state.loading && !err)
//       return loading("Request still in the process...")
//
//     if (data)
//       success(data)
//
//     if (err)
//       return error(err)
//
//     return null
//   }
// }

export default Fetch
