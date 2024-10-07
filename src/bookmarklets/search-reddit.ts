function toggleSearchTerm(
  term: string,
  searchParamName: string,
  separator: string
) {
  const searchParams = new URLSearchParams(location.search);

  const searchTerms = searchParams.get(searchParamName)?.split(separator) ?? [];

  const i = searchTerms.indexOf(term);
  if (i < 0) {
    searchTerms.push(term);
  } else {
    searchTerms.splice(i, 1);
  }

  searchParams.set(searchParamName, searchTerms.join(separator));

  location.search = "" + searchParams;
}

toggleSearchTerm("site:reddit.com", "q", " ");
