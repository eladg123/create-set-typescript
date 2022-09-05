import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Middleware,
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { SetsReducer } from './state/reducers/SetsReducer'
import { ShirtsReducer } from './state/reducers/ShirtsReducer'
import { PantsReducer } from './state/reducers/PantsReducer'
import { ShoesReducer } from './state/reducers/ShoesReducer'

const rootReducer = combineReducers({
  sets: SetsReducer,
  shirts: ShirtsReducer,
  pants: PantsReducer,
  shoes: ShoesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const initialState: Object = {}

const middleware: Middleware[] = [thunk]

const store: Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
