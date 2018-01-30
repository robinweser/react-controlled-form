# Motivation

You might now think *"Oh come one, yet even another form library form React/Redux?"* and we totally understand that, but just think about why there are so many solutions in the first place; because form management is not at all a simple task. It might seem trivial to hack together some forms, but it is pretty hard to solve it for everyone without complex APIs, because there are simply tons of different use cases to be considered.

Now you might say *"Ok, and how will this one solve, what none other is able to?"*.<br>
Don't get us wrong, we really love and appreciate the work done with [redux-form](https://github.com/erikras/redux-form), [react-redux-form](https://github.com/davidkpiano/react-redux-form) and all the other great solutions. But, we think the problem is wrong abstraction: Most solutions ship opinionated, declarative React components that abstract all the complex tasks away. They have tons of different props which accept thousands of combinations to satisfy most of the daily use cases.
You might have already spot the issue. Trying to satisfy everyone is simply impossible.

**Instead of shipping predefined components with lots of built-in features, we instead give you the right abstractions to create your very own forms. We only store and manage your data and handle component updates on changes.**
