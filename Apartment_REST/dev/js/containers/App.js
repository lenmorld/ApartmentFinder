// like Layout that contains all of the other components

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../scss/style.scss';    // scss can be used by all

import * as actions from '../actions/index';

import ApartmentList from '../components/ApartmentList';
// import Apartment from '../components/Apartment';
// import ApartmentDetail from '../containers/apartment-detail';


class App extends React.Component {
    render() {
        const { apartments, aptActions } = this.props;

        return(
            <div>
                <h2>Apartment List:</h2>
                <ApartmentList actions={aptActions} apartments={apartments} />
                <hr/>
                {/*<h2>Apartment Details:</h2>*/}
                {/*<ApartmentDetail />*/}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        apartments: state.apartments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        aptActions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// const App = () => (
//   <div>
//     <h2>Apartment List:</h2>
//     <ApartmentList actions={actions} apartments={apartments} />
//     <hr/>
//     {/*<h2>Apartment Details:</h2>*/}
//     {/*<ApartmentDetail />*/}
//   </div>
// );

// export default App;
