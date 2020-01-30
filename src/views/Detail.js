import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { getScene } from '../three/store';
import { loadDetailView, exitDetailView } from '../three/detailView';

const Detail = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const history = useHistory();

  useEffect(() => {
    const scene = getScene();
    if (scene) {
      const object = scene.getObjectById(parseInt(id), true);
      setModel(object);
      loadDetailView(object);
    }
  }, [id]);

  useEffect(() => {
    if (model) {
      loadDetailView(model);
    }
  });

  const handleExit = () => {
    exitDetailView();
    history.push('/');
  };

  return (
    <div>
      <p>Dit is de detailpagina van: {model ? model.message : null}</p>
      <button onClick={() => handleExit()}>Terug</button>
    </div>
  );
};

export default Detail;
