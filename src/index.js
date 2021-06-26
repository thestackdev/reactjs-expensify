import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'Components/App'
import store from 'Redux/store'
import 'Styles/index.css'
import 'Styles/app.css'
import 'Styles/dashboard.css'
import 'Styles/dashboardheader.css'
import 'Styles/dashboardbody.css'
import 'Styles/dropdown.css'
import 'Styles/emptycontainer.css'
import 'Styles/reports.css'
import 'Styles/transactionbody.css'
import 'Styles/modal.css'
import 'Styles/transactionsheader.css'
import 'Styles/basemodal.css'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
