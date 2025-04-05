import React from "react";
import Skeleton from "react-loading-skeleton";

const PremiereCardSkeleton: React.FC = () => (
  <div className="col-md-3 col-sm-6 mb-4">
    <Skeleton height={200} />
    <Skeleton count={2} style={{ marginTop: "0.5rem" }} />
  </div>
);

export default PremiereCardSkeleton;