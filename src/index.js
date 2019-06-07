import React from "react";
import ReactDOM from "react-dom";
import slugify from 'slugify';
import ReactGA from 'react-ga';

import 'milligram';
import './styles.css';

import data from './data.json';

ReactGA.initialize('UA-141543901-1');

const slug = s => slugify(s, { lower: true });

const ListHeading = ({ children, ...other }) => (
  <h2 className="list-title" {...other}>{children}</h2>
);

const renderData = data => (
  <div>
    {data.map(list => renderList(list))}
  </div>
);

const renderList = ({
  name,
  items,
}) => (
  <div key={name}>
    <ListHeading id={slug(name)}>{name}</ListHeading>
    <ul className="plain-list">
      {renderListItems(items)}
    </ul>
  </div>
);

const renderListItems = items => items.map(({
  url,
  name,
}) => (
  <li key={name}>
    <ReactGA.OutboundLink
      eventLabel={url}
      to={url}
      target="_blank"
      el="noreferrer noopener"
    >
      {name}
    </ReactGA.OutboundLink>
  </li>
));

const renderTOCListItems = lists => lists.map(({
  name,
}) => (
  <li key={name}>
    <a
      href={`#${slug(name)}`}
    >
      {name}
    </a>
  </li>
));

const renderTOC = data => (
  <div>
    <h2 className="list-title">Contents</h2>
    <ul>
      {renderTOCListItems(data)}
    </ul>
  </div>
);

const App = ({ data }) => (
  <div className="container">
    <header>
      <div className="row">
        <div className="column"><a href="/">velox.cc</a> / awesome-road-bike</div>
      </div>
    </header>
    <div className="row">
      <div className="column">
        <h1 className="main-title">Awesome Road Bike</h1>
        <p>A curated list of road bike related stuff!</p>
        {data && renderTOC(data)}
        {data && renderData(data)}
      </div>
    </div>
  </div>
);

var mountNode = document.getElementById("app");
ReactDOM.render(<App data={data} />, mountNode);
