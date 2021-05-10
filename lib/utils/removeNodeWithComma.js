module.exports = (node, sourceCode) => function* (fixer) {
    yield fixer.remove(node);

    const comma = sourceCode.getTokenAfter(node)
    if (comma.value === ",") {
        yield fixer.remove(comma)
    }
}