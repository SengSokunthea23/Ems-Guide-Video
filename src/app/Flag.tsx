import React from 'react';
export const Flag: React.FC = () => (
  <div style={{width: 20, height: 14, borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
    <i style={{flex: 1, background: '#032EA1'}} /><i style={{flex: 2, background: '#E00025', display: 'grid', placeItems: 'center'}}><b style={{width: 8, height: 4, background: '#fff', borderRadius: 1}} /></i><i style={{flex: 1, background: '#032EA1'}} />
  </div>);
