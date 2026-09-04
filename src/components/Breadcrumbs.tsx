interface Crumb {
  name: string;
  /** Real URL path. The last crumb (current page) has no path. */
  path?: string;
}

interface Props {
  items: Crumb[];
}

/**
 * Visible breadcrumb navigation. The corresponding BreadcrumbList JSON-LD is
 * emitted separately in the page head — keep the two in sync when editing.
 */
const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/50">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-2">
              {isLast || !item.path ? (
                <span aria-current="page" className="text-white/70">{item.name}</span>
              ) : (
                <a
                  href={item.path}
                  className="text-white/50 hover:text-aqua transition-colors"
                >
                  {item.name}
                </a>
              )}
              {!isLast && <span aria-hidden="true" className="text-white/25">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
