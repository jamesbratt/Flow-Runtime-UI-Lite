import React from 'react';
import pathOr from 'ramda/src/pathOr';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { connect } from 'react-redux';
import { fetchNavigationData } from '../actions/navigationActions';

interface navigationWrapperProps {
  id: string
  navigation: any
  fetchNavigationData: Function
  componentRegistry: any
  theme: string
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
    if (this.props.navigation) {
      const { componentRegistry, theme, id } = this.props;
      const { navigation } = this.props.navigation;

      /**
       * We are interested in the navigationItemDataResponses and navigationItemResponses
       * keys. The former, tells us stuff like - is the menu item visible or selected etc,
       * whilst the latter tells us about stuff to display - like the label.
       * So for convenience, we wnat to merge these two arrays of objects by navigation item ID
       * so that the component that renders the menu just has one array of items to loop over.
       */
      const navigationData: any = pathOr(null, ['navigationItemDataResponses'], navigation);
      const navigationItems: any = pathOr(null, ['navigationItemResponses'], navigation);
  
      const navItemsdata = navigationData ? navigationData.reduce(
        (item: any, data: any) => Object.assign(item, { [data.navigationItemId]: data }), {}
      ) : [];
  
      const items = navigationItems.map((item: any) => {
        if (navItemsdata[item.id]) {
          return mergeDeepLeft(navItemsdata[item.id], item);
        } 
        return item
      })

      const Navigation = componentRegistry[theme]['navigation'];

      return <Navigation id={id} items={items} title={navigation.label} />;
    } 

    return <p>Navigation is loading...</p>;
  }
}

const mapStateToProps = ({ navigations, componentRegistry, settings }: any, ownProps: any) => ({
  navigation: navigations.find((nav: any) => nav.id === ownProps.id),
  componentRegistry,
  theme: settings.theme,
});

const mapDispatchToProps = {
  fetchNavigationData,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper);

