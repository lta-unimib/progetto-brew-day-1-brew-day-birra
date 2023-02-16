import React, { Component } from "react";
import NextRecipeView from "../components/NextRecipeView";
import BodyThemeManager from "../components/BodyThemeManager";
import ContentCard from '../components/ContentCard';
import AdviceView from "../components/AdviceView";
import JimFlex from '../components/JimFlex';

class Home extends Component {
  render() {
    const adviceView = (
      <AdviceView
        notifier={this.notifier}/>
    );

    const nextRecipeView = (
      <NextRecipeView
        notifier={this.notifier}
      />
    );

    return (
      <BodyThemeManager>
        <JimFlex>
          <ContentCard>{adviceView}</ContentCard>
          <ContentCard>{nextRecipeView}</ContentCard>
        </JimFlex>
      </BodyThemeManager>
    );
  }
}

export default Home;
