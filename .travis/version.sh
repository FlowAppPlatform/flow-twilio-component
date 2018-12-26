make_version() {
  p1="$(($1 / 100))"
  p2="$((($1 - (100 * $p1)) / 10))"
  p3="$(($1 - (100 * $p1) - (10 * $p2)))"
  VERSION=$(printf '%s.%s.%s' $p1 $p2 $p3)
  npm version $VERSION --no-git-tag-version --force
}

make_version $TRAVIS_BUILD_NUMBER
