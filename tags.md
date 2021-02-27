---
layout: default
title: Tags
---

{% assign rawtags = "" %}
{% for post in site.posts %}
{% assign ttags = post.tags | join:'|' | append:'|' %}
{% assign rawtags = rawtags | append:ttags %}
{% endfor %}

{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}

{% for tag in rawtags %}
{% if tag != "" %}
{% if tags == "" %}
{% assign tags = tag | split:'|' %}
{% endif %}

    {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}

{% endif %}
{% endfor %}

<div class="flex space-between">
    <div class="relative">
<h1>{{ page.title }}</h1>

<em>Index of tags across all posts.</em>

<div class="margin-top"></div>

{% for tag in tags %}

<h2 id="{{tag}}">{{ tag }}</h2>
<ul>
{% for post in site.posts %}
{% if post.tags contains tag %}
<li><a href="{{ post.url }}" alt="{{ post.summary }}">{{ post.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}
</div>
<div class="relative">
<div class="sticky margin-left">
<div>Jump to tag category:</div>
<div class="margin-top"></div>
{% for tag in tags %}
{% assign anchor = tag | replace: " ", "-" %}
<div><a href="#{{anchor}}">{{ tag }}</a></div>
{%- endfor -%}
</div>
</div>

</div>
