import React from 'react';
import { connect } from 'react-redux';
import { fetchNavigationData } from '../actions/navigationActions';

interface navigationWrapperProps {
  id: string
  navigation: any
  fetchNavigationData: Function
}

/**
 * @description A higher order component that takes care of asking the engine for navigation
 * data, so that navigation element components can be functional and remain as "dumb" as possible.
 */
class NavigationWrapper extends React.Component<navigationWrapperProps, {}> {

  componentDidMount() {
    this.props.fetchNavigationData(
      this.props.id,
    );
  }

  render() {
    return (
      <>
        {this.props.navigation ?
          <div>{this.props.navigation.id}</div> :
          <p>Navigation is loading...</p>
        }
      </>
    );
  }
}

const mapStateToProps = ({ navigations }: any, ownProps: any) => ({
  navigation: navigations.find((nav: any) => nav.id === ownProps.id),
});

const mapDispatchToProps = {
  fetchNavigationData,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper);

