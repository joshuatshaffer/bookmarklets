function toggleSearchTerm(
  term: string,
  searchParamName: string,
  separator: string
) {
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get(searchParamName)?.split(separator) ?? [];
  const i = q.indexOf(term);
  if (i >= 0) {
    q.splice(i, 1);
  } else {
    q.push(term);
  }
  searchParams.set(searchParamName, q.join(separator));
  location.search = "" + searchParams;
}

toggleSearchTerm("site:reddit.com", "q", " ");
