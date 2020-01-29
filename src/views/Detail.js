import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getScene } from '../three/store';

const Detail = () => {
  const { id } = useParams();
  const scene = getScene();
  const [model, setModel] = useState();
  useEffect(() => {
    if (scene) {
      const object = scene.getObjectById(parseInt(id), true);
      setModel(object);
    }
  }, [id]);
  return (
    <div>
      <p>Dit is de detailpagina van: {model ? model.message : null}</p>
    </div>
  );
};

export default Detail;
