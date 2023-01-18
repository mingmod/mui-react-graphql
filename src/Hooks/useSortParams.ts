import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

type SortParams = {
  orderBy: string;
  order: Order;
};

const generateSortParams = (orderBy: string, order: string): SortParams => ({
  orderBy,
  order: order === Order.ASC ? Order.ASC : Order.DESC,
});

export const useSortParams = (
  defaultOrderBy: string,
  defaultOrder: Order = Order.ASC
) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<SortParams>({
    orderBy: defaultOrderBy,
    order: defaultOrder,
  });

  useEffect(() => {
    setSort(
      generateSortParams(
        searchParams.get("order-by") ?? defaultOrderBy,
        searchParams.get("order") ?? defaultOrder
      )
    );
  }, [searchParams, defaultOrderBy, defaultOrder]);

  const setSortParams = (nextOrderBy: string = defaultOrderBy) => {
    const nextOrder =
      nextOrderBy === sort.orderBy
        ? sort.order === Order.ASC
          ? Order.DESC
          : Order.ASC
        : defaultOrder;

    setSearchParams({
      "order-by": nextOrderBy,
      order: nextOrder,
    });
  };

  return {
    sort,
    setSortParams,
  };
};

export default useSortParams;
