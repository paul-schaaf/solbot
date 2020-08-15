import { setConnection, getConnection } from './connection';
import ClusterUtil from './cluster';

const changeCluster = (clusterName) => {
  ClusterUtil.setCluster(clusterName);
  setConnection(ClusterUtil.getCluster());
};

export default {
  init(clusterName) {
    ClusterUtil.setCluster(clusterName);
    setConnection(ClusterUtil.getCluster());
  },
  getConnection,
  getCluster: ClusterUtil.getCluster,
  changeCluster,
};
