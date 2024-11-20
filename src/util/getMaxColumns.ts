export function getMaxColumns(containerWidth:number, itemWidth:number, gutter = 0) {
    // Calculate the total width needed for each item including gutter
    const totalItemWidth = itemWidth + gutter;

    // Calculate how many items fit into the container
    const maxColumns = Math.floor(containerWidth / totalItemWidth);

    return maxColumns;
}