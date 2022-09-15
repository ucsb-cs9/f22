---
title: CS56, Fall 2018, pconrad
permalink: "/staff_list/"
---

# {{site.course}}, {{site.quarter}}

# Course Staff

<table class="bios">
<tr><th>Name</th><th>Role</th><th>Bio</th></tr>
{% for b in site.staff %}
  <tr>
    <td><a href="{{b.url | relative_url }}">{{b.name }}</a></td>
    <td>{{b.role}}</td>
    <td><p class="staff-bio">{{b.bio}}</p></td>
  </tr>
{% endfor %}
</table>

